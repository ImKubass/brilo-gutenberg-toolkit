import React, {useEffect, useState, useRef} from "react"
import {CheckboxControl, PanelBody, TextControl, Spinner} from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import {__} from "@wordpress/i18n"
import {Icon, cancelCircleFilled, chevronDown, chevronUp} from "@wordpress/icons"
import "./SelectPostsControl.scss"

import {DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay} from "@dnd-kit/core"
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"

interface SelectPostsControlProps {
  selectedItems: number[]
  onChange: (selectedItems: number[]) => void
  postType: string
  label: string
  limit?: number
  perPageLimit?: number
}

type Post = {
  id: number
  title: {
    rendered: string
  }
}

interface FetchPostsOptions {
  search?: string
  perPage?: number
  include?: number[]
}

const getRestBase = (postType: string) => {
  if (postType === "post") return "posts"
  if (postType === "page") return "pages"
  return postType
}

interface SortableItemProps {
  post: Post
  onRemove: (post: Post) => void
}

const SortableItem: React.FC<SortableItemProps> = ({post, onRemove}) => {
  const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging} = useSortable({id: post.id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  }

  return (
    <div ref={setNodeRef} style={style} className="select-posts-control__selected-item flex gap-2">
      <span ref={setActivatorNodeRef} {...attributes} {...listeners} className="select-posts-control__selected-handle">
        ☰
      </span>

      {post.title.rendered}

      <button
        type="button"
        className="select-posts-control__remove-selected"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(post)
        }}
      >
        <Icon icon={cancelCircleFilled} size={20} />
      </button>
    </div>
  )
}

const SelectPostsControl: React.FC<SelectPostsControlProps> = ({selectedItems, onChange, postType, label, limit = -1, perPageLimit = 20}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const endpoint = getRestBase(postType)

  const fetchPosts = async ({search, perPage, include}: FetchPostsOptions) => {
    setLoading(true)

    const params = new URLSearchParams({_fields: "id,title"})
    if (search) params.set("search", search)
    if (perPage) params.set("per_page", String(perPage))
    if (include?.length) params.set("include", include.join(","))

    const path = `/wp/v2/${endpoint}?${params.toString()}`

    try {
      const data = await apiFetch<Post[]>({path})
      if (include?.length) setSelectedPosts(data)
      else setPosts(data)
    } catch (e) {
      console.error("Failed to fetch posts", e)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await fetchPosts({search: searchQuery, perPage: perPageLimit})
      if (!searchQuery) fetchPosts({include: selectedItems})
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const handleCheckboxChange = (post: Post, isChecked: boolean) => {
    if (isChecked && limit > 0 && selectedItems.length >= limit) return
    if (isChecked) setSelectedPosts((prev) => [...prev, post])
    else setSelectedPosts((prev) => prev.filter((p) => p.id !== post.id))
  }

  useEffect(() => {
    onChange(selectedPosts.map((p) => p.id))
  }, [selectedPosts])

  const selectedIds = new Set(selectedPosts.map((p) => p.id))
  const mergedPosts = searchQuery
    ? posts
    : Array.from(new Map([...selectedPosts, ...posts].map((p) => [p.id, p])).values()).sort((a, b) => b.id - a.id)

  const isAllChecked = posts.length > 0 && posts.every((p) => selectedIds.has(p.id))
  const isIndeterminate = posts.some((p) => selectedIds.has(p.id)) && !isAllChecked

  const handleSelectAllChange = (isChecked: boolean) => {
    setSelectedPosts((prev) => {
      if (isChecked) return Array.from(new Map([...prev, ...posts].map((p) => [p.id, p])).values())
      const postsIdsSet = new Set(posts.map((p) => p.id))
      return prev.filter((p) => !postsIdsSet.has(p.id))
    })
  }

  const sensors = useSensors(useSensor(PointerSensor))
  const activePost = activeId ? selectedPosts.find((p) => p.id === activeId) || null : null

  return (
    <PanelBody title={label} className="select-posts-control">
      <div ref={ref} className="select-posts-control__selected" onClick={() => setOpen(!open)}>
        {selectedPosts.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={({active, over}) => {
              if (over && active.id !== over.id) {
                setSelectedPosts((prev) => {
                  const oldIndex = prev.findIndex((p) => p.id === active.id)
                  const newIndex = prev.findIndex((p) => p.id === over.id)
                  return arrayMove(prev, oldIndex, newIndex)
                })
              }
            }}
            onDragEnd={() => {
              setActiveId(null)
            }}
          >
            <SortableContext items={selectedPosts.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              {selectedPosts.map((selectedPost) => (
                <SortableItem key={selectedPost.id} post={selectedPost} onRemove={(post) => handleCheckboxChange(post, false)} />
              ))}
            </SortableContext>

            <DragOverlay>
              {activePost ? <div className="select-posts-control__selected-item --overlay">{activePost.title.rendered}</div> : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="select-posts-control__placeholder">{__("Vyberte položky", "brilo-blocks")}</div>
        )}

        <Icon className="select-posts-control__arrow" icon={open ? chevronUp : chevronDown} size={24} />
      </div>

      <div className={`select-posts-control__content flex column gap-2 ${open ? "--open" : "--closed"}`}>
        <TextControl placeholder={__("Hledat...", "brilo-blocks")} value={searchQuery} onChange={(value) => setSearchQuery(value)} />

        {limit <= 0 && (
          <CheckboxControl
            className="select-posts-control__select-all flex column gap-1"
            label={__("Vybrat vše", "brilo-blocks")}
            indeterminate={isIndeterminate}
            checked={isAllChecked}
            onChange={(checked) => handleSelectAllChange(checked)}
          />
        )}

        <div className="select-posts-control__checkbox-wrapper">
          {loading && (
            <div className={"select-posts-control__loading"}>
              <Spinner />
            </div>
          )}

          {mergedPosts.map((post) => (
            <label
              className="select-posts-control__checkbox-label p-3 cursor-pointer"
              htmlFor={`select-posts-control-post-${post.id}`}
              key={post.id}
            >
              <CheckboxControl
                className="select-posts-control__checkbox"
                key={post.id}
                id={`select-posts-control-post-${post.id}`}
                label={post.title.rendered}
                checked={selectedIds.has(post.id)}
                onChange={(checked) => handleCheckboxChange(post, checked)}
                disabled={!selectedIds.has(post.id) && limit > 0 && selectedItems.length >= limit}
              />
            </label>
          ))}
          {!posts.length && searchQuery && <div>{`${__("Nic nenalezeno pod pojmem:", "brilo-blocks")} ${searchQuery}`}</div>}
          {limit > 0 && <div>{`${__("Počet položek k vybrání:", "brilo-blocks")} ${limit - selectedItems.length}`}</div>}
        </div>
      </div>
    </PanelBody>
  )
}

export default SelectPostsControl

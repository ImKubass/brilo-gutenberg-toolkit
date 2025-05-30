import React, {useEffect, useState} from "react"
import {CheckboxControl, PanelBody, TextControl} from "@wordpress/components"
import {useSelect} from "@wordpress/data"
import {__} from "@wordpress/i18n"
import "./SelectPostsControl.scss"

interface SelectPostsControlProps {
  selectedItems: number[]
  onChange: (selectedItems: number[]) => void
  postType: string
  label: string
  limit?: number
}

type Post = {
  id: number
  title: {
    rendered: string
  }
}

const SelectPostsControl: React.FC<SelectPostsControlProps> = ({selectedItems, onChange, postType, label, limit = -1}) => {
  const posts = useSelect(
    (select) =>
      select("core").getEntityRecords("postType", postType, {
        per_page: -1,
      }),
    [],
  ) as Post[] | null

  useEffect(() => {
    if (posts) {
      const validPostIds = posts.map((post) => post.id)
      const validSelectedItems = selectedItems.filter((id) => validPostIds.includes(id))

      if (validSelectedItems.length !== selectedItems.length) {
        onChange(validSelectedItems)
      }
    }
  }, [posts])

  const handleCheckboxChange = (postId: number, isChecked: boolean) => {
    if (isChecked && limit > 0 && selectedItems.length >= limit) {
      return selectedItems
    }

    return isChecked ? [...selectedItems, postId] : selectedItems.filter((id) => id !== postId)
  }

  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts?.filter((post) => post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredPostIds = filteredPosts?.map((post) => post.id) || []
  const isAllChecked = filteredPostIds.length > 0 && filteredPostIds.every((id) => selectedItems.includes(id))
  const isIndeterminate = filteredPostIds.some((id) => selectedItems.includes(id)) && !isAllChecked

  const handleSelectAllChange = (isChecked: boolean) => {
    const updatedItems = isChecked
      ? Array.from(new Set([...selectedItems, ...filteredPostIds]))
      : selectedItems.filter((id) => !filteredPostIds.includes(id))

    onChange(updatedItems)
  }

  return (
    <PanelBody title={label} className={"select-posts-control"}>
      <div className={"select-posts-control__content"}>
        <TextControl placeholder={__("Hledat...", "brilo-blocks")} value={searchQuery} onChange={(value) => setSearchQuery(value)} />
        {limit <= 0 && (
          <CheckboxControl
            className={"select-posts-control__select-all"}
            label={__("Vybrat vše", "brilo-blocks")}
            indeterminate={isIndeterminate}
            checked={isAllChecked}
            onChange={(isChecked) => handleSelectAllChange(isChecked)}
          />
        )}

        <div className={"select-posts-control__checkbox-wrapper"}>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <CheckboxControl
                className={"select-posts-control__checkbox"}
                key={post.id}
                label={post.title.rendered}
                checked={selectedItems.includes(post.id)}
                onChange={(isChecked) => onChange(handleCheckboxChange(post.id, isChecked))}
                disabled={!selectedItems.includes(post.id) && limit > 0 && selectedItems.length >= limit}
              />
            ))}
          {limit > 0 && <div>{`${__("Počet položek k vybrání:")} ${limit - selectedItems.length}`}</div>}
        </div>
      </div>
    </PanelBody>
  )
}

export default SelectPostsControl

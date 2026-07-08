import React, {useEffect, useState} from "react"
import {CheckboxControl, PanelBody, TextControl, Spinner} from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import {__} from "@wordpress/i18n"
import {Icon, cancelCircleFilled, chevronDown, chevronUp} from "@wordpress/icons"
import "./SelectTermsControl.scss"

interface SelectTermsControlProps {
  selectedItems: number[]
  onChange: (selectedItems: number[]) => void
  taxonomy: string
  label: string
  limit?: number
  clientId: string
}

type Term = {
  id: number
  name: string
}

const SelectTermsControl: React.FC<SelectTermsControlProps> = ({selectedItems, onChange, taxonomy, label, limit = -1, clientId}) => {
  const [terms, setTerms] = useState<Term[]>([])
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchTerms = async (search?: string, signal?: AbortSignal) => {
    setLoading(true)

    const params = new URLSearchParams({_fields: "id,name", per_page: "100"})
    if (search) params.set("search", search)

    const path = `/wp/v2/${taxonomy}?${params.toString()}`

    try {
      const data = await apiFetch<Term[]>({path, signal})
      if (signal?.aborted) return
      setTerms(data)
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return
      console.error("Failed to fetch terms", e)
      setTerms([])
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
      fetchTerms(searchQuery || undefined, controller.signal)
    }, 400)
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [searchQuery, taxonomy])

  useEffect(() => {
    if (selectedItems.length === 0) {
      setSelectedTerms([])
      return
    }
    const controller = new AbortController()
    const params = new URLSearchParams({
      _fields: "id,name",
      include: selectedItems.join(","),
      per_page: String(selectedItems.length),
    })
    apiFetch<Term[]>({path: `/wp/v2/${taxonomy}?${params.toString()}`, signal: controller.signal})
      .then((data) => {
        if (controller.signal.aborted) return
        const dataMap = new Map(data.map((t) => [t.id, t]))
        setSelectedTerms(selectedItems.map((id) => dataMap.get(id)).filter((t): t is Term => t !== undefined))
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  const handleChange = (term: Term, isChecked: boolean) => {
    if (isChecked && limit === 1) {
      setSelectedTerms([term])
      return
    }
    if (isChecked && limit > 0 && selectedItems.length >= limit) return
    if (isChecked) setSelectedTerms((prev) => [...prev, term])
    else setSelectedTerms((prev) => prev.filter((t) => t.id !== term.id))
  }

  useEffect(() => {
    onChange(selectedTerms.map((t) => t.id))
  }, [selectedTerms])

  const selectedIds = new Set(selectedTerms.map((t) => t.id))

  const isAllChecked = terms.length > 0 && terms.every((t) => selectedIds.has(t.id))
  const isIndeterminate = terms.some((t) => selectedIds.has(t.id)) && !isAllChecked

  const handleSelectAllChange = (isChecked: boolean) => {
    setSelectedTerms((prev) => {
      if (isChecked) return Array.from(new Map([...prev, ...terms].map((t) => [t.id, t])).values())
      const termIdsSet = new Set(terms.map((t) => t.id))
      return prev.filter((t) => !termIdsSet.has(t.id))
    })
  }

  return (
    <PanelBody title={label} className="select-terms-control">
      <div className="select-terms-control__selected" onClick={() => setOpen(!open)}>
        {selectedTerms.length ? (
          <div className="select-terms-control__selected-list">
            {selectedTerms.map((term) => (
              <div key={term.id} className="select-terms-control__selected-item flex gap-2">
                {term.name}
                <button
                  type="button"
                  className="select-terms-control__remove-selected"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleChange(term, false)
                  }}
                >
                  <Icon icon={cancelCircleFilled} size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="select-terms-control__placeholder">{__("Vyberte položky", "brilo-blocks")}</div>
        )}
        <Icon className="select-terms-control__arrow" icon={open ? chevronUp : chevronDown} size={24} />
      </div>

      <div className={`select-terms-control__content flex column gap-2 ${open ? "--open" : "--closed"}`}>
        <TextControl placeholder={__("Hledat...", "brilo-blocks")} value={searchQuery} onChange={(value) => setSearchQuery(value)} />

        {limit <= 0 && (
          <CheckboxControl
            className="select-terms-control__select-all flex column gap-1"
            label={__("Vybrat vše", "brilo-blocks")}
            indeterminate={isIndeterminate}
            checked={isAllChecked}
            onChange={(checked) => handleSelectAllChange(checked)}
          />
        )}

        <div className="select-terms-control__checkbox-wrapper">
          {loading && (
            <div className="select-terms-control__loading">
              <Spinner />
            </div>
          )}
          {terms.map((term) => (
            <label
              className="select-terms-control__checkbox-label p-3 cursor-pointer"
              htmlFor={`select-terms-control-${clientId}-term-${term.id}`}
              key={term.id}
            >
              <CheckboxControl
                className="select-terms-control__checkbox"
                id={`select-terms-control-${clientId}-term-${term.id}`}
                label={term.name}
                checked={selectedIds.has(term.id)}
                onChange={(checked) => handleChange(term, checked)}
                disabled={!selectedIds.has(term.id) && limit > 0 && selectedItems.length >= limit}
              />
            </label>
          ))}
          {!terms.length && searchQuery && <div>{`${__("Nic nenalezeno pod pojmem:", "brilo-blocks")} ${searchQuery}`}</div>}
          {limit > 0 && limit !== 1 && <div>{`${__("Počet položek k vybrání:", "brilo-blocks")} ${limit - selectedItems.length}`}</div>}
        </div>
      </div>
    </PanelBody>
  )
}

export default SelectTermsControl

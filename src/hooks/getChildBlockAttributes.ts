import {useEffect} from "react"
import {useSelect} from "@wordpress/data"
import {BlockInstance} from "@wordpress/blocks"
import CoreEditorStoreSelectors from "@wordpress/block-editor/store/selectors"
import {store as blockEditorStore} from "@wordpress/block-editor"

function getChildBlockAttributes<T>(
  clientId: string,
  setAttributes: (attributes: Partial<Record<string, any>>) => void,
  attributeKey: string = "items",
) {
  const childBlocks = useSelect(
    (select) => {
      const editor = select(blockEditorStore) as typeof CoreEditorStoreSelectors
      return editor.getBlocks(clientId)
    },
    [clientId],
  )

  useEffect(() => {
    // Extract and type-cast the attributes
    const childAttributes = childBlocks.map((block: BlockInstance) => block.attributes) as T[]

    // Update parent block's attributes dynamically with the given key
    setAttributes({[attributeKey]: childAttributes})
  }, [childBlocks, setAttributes, attributeKey])
}

export default getChildBlockAttributes

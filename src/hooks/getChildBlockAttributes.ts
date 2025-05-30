import {useEffect} from "react"
import {useSelect} from "@wordpress/data"
import {BlockInstance} from "@wordpress/blocks"

function getChildBlockAttributes<T>(
  clientId: string,
  setAttributes: (attributes: Partial<Record<string, any>>) => void,
  attributeKey: string = "items",
) {
  const childBlocks = useSelect((select) => select("core/block-editor").getBlocks(clientId) as BlockInstance[], [clientId])

  useEffect(() => {
    // Extract and type-cast the attributes
    const childAttributes = childBlocks.map((block: BlockInstance) => block.attributes) as T[]

    // Update parent block's attributes dynamically with the given key
    setAttributes({[attributeKey]: childAttributes})
  }, [childBlocks, setAttributes, attributeKey])
}

export default getChildBlockAttributes

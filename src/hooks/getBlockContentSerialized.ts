import {useEffect} from "react"
import {useSelect} from "@wordpress/data"
import {serialize} from "@wordpress/blocks"

function getBlockContentSerialized(clientId: string, setAttributes: (attributes: Partial<{content: T[]}>) => void) {
  const allInnerBlocksContent = useSelect((select) => {
    const innerBlocks = select("core/block-editor").getBlocks(clientId)

    let serializedContent = serialize(innerBlocks)

    serializedContent = serializedContent.replace(/<!--[\s\S]*?-->/g, "")

    return serializedContent
  })

  useEffect(() => {
    setAttributes({content: allInnerBlocksContent})
  }, [setAttributes, allInnerBlocksContent])
}

export default getBlockContentSerialized

import {useEffect} from "react"
import {useSelect} from "@wordpress/data"
import {serialize} from "@wordpress/blocks"
import CoreEditorStoreSelectors from "@wordpress/block-editor/store/selectors"
import {store as blockEditorStore} from "@wordpress/block-editor"

function getBlockContentSerialized<T>(clientId: string, setAttributes: (attributes: Partial<Record<string, any>>) => void) {
  const allInnerBlocksContent = useSelect(
    (select) => {
      const editor = select(blockEditorStore) as typeof CoreEditorStoreSelectors
      const innerBlocks = editor.getBlocks(clientId)

      let serializedContent = serialize(innerBlocks)

      serializedContent = serializedContent.replace(/<!--[\s\S]*?-->/g, "")

      return serializedContent
    },
    [clientId],
  )

  useEffect(() => {
    setAttributes({content: allInnerBlocksContent})
  }, [setAttributes, allInnerBlocksContent])
}

export default getBlockContentSerialized

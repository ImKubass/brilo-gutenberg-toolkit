import {InnerBlocks} from "@wordpress/block-editor"
import React from "react"
import {__} from "@wordpress/i18n"
import "./ContentControl.scss"

interface ContentWrapperProps {
  allowedBlocks: string[]
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({allowedBlocks}) => {
  return (
    <div className="content-wrapper">
      <InnerBlocks
        allowedBlocks={allowedBlocks}
        template={allowedBlocks.length > 0 ? [[allowedBlocks[0], {placeholder: __("Přidejte obsah", "brilo-blocks")}]] : undefined}
      />
    </div>
  )
}

export default ContentWrapper

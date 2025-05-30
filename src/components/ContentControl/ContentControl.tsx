import {InnerBlocks} from "@wordpress/block-editor"
import React from "react"
import {__} from "@wordpress/i18n"
import "./ContentControl.scss"

interface ContentWrapperProps {
  allowedBlocks: string[]
  onChange?: (value: string) => void
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({allowedBlocks, onChange}) => {
  return (
    <div className="content-wrapper">
      <InnerBlocks
        onChange={onChange}
        allowedBlocks={allowedBlocks}
        defaultBlock={[allowedBlocks[0], {placeholder: __("Přidejte obsah", "brilo-blocks")}]}
      />
    </div>
  )
}

export default ContentWrapper

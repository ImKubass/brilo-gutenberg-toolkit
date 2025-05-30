import React from "react"
import {BaseControl, PanelBody, TextControl, ToggleControl} from "@wordpress/components"
import {__} from "@wordpress/i18n"
import {Button} from "@components/ButtonControl/types"
import {URLInput} from "@wordpress/block-editor"

interface ButtonControlProps {
  title: string
  button: Button
  onChange: (button: Button) => void
}

const ButtonControl: React.FC<ButtonControlProps> = ({title, button, onChange}) => {
  return (
    <>
      <PanelBody title={__(title, "brilo-blocks")}>
        <TextControl
          label={__("Text na tlačítku", "brilo-blocks")}
          value={button.title || ""}
          onChange={(value) => onChange({...button, title: value})}
        />

        <BaseControl label={__("URL", "brilo-blocks")}>
          <URLInput value={button.url || ""} onChange={(value) => onChange({...button, url: value})} />
        </BaseControl>

        <ToggleControl
          label={__("Otevřít odkaz v novém okně", "brilo-blocks")}
          checked={button.blank}
          onChange={() => onChange({...button, blank: !button.blank})}
        />
      </PanelBody>
    </>
  )
}

export default ButtonControl

import ButtonControl from "@components/ButtonControl/ButtonControl"
import React from "react"
import {__} from "@wordpress/i18n"
import {ButtonGroup} from "@components/ButtonGroupControl/types"

interface ButtonGroupControlProps {
  buttons: ButtonGroup
  onChange: (buttons: ButtonGroup) => void
}

const ButtonGroupControl: React.FC<ButtonGroupControlProps> = ({buttons, onChange}) => {
  return (
    <>
      <ButtonControl
        title={__("Hlavní tlačítko", "brilo-blocks")}
        button={buttons.primary}
        onChange={(button) => {
          onChange({
            ...buttons,
            primary: button,
          })
        }}
      />

      <ButtonControl
        title={__("Vedlejší tlačítko", "brilo-blocks")}
        button={buttons.secondary}
        onChange={(button) => {
          onChange({
            ...buttons,
            secondary: button,
          })
        }}
      />
    </>
  )
}

export default ButtonGroupControl

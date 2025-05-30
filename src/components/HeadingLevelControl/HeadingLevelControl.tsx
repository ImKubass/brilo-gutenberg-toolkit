import React from "react"
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components"
import {__} from "@wordpress/i18n"
import {HeadingLevelControlProps, HEADING_LEVELS, HeadingLevel, HEADING_HIGHER_LEVELS} from "./types"

const HeadingLevelControl: React.FC<HeadingLevelControlProps> = ({headingLevel, headingLevelLabel, onChange, higherLevel}) => {
  const options = higherLevel ? HEADING_HIGHER_LEVELS : HEADING_LEVELS

  return (
    <>
      <ToggleGroupControl
        label={headingLevelLabel || __("Level nadpisu", "brilo-blocks")}
        value={headingLevel || HEADING_LEVELS[0].value}
        onChange={(value) => onChange(value as HeadingLevel)}
        isBlock
      >
        {options.map((headingLevel) => (
          <ToggleGroupControlOption key={headingLevel.value} value={headingLevel.value} label={headingLevel.label} />
        ))}
      </ToggleGroupControl>
    </>
  )
}

export default HeadingLevelControl

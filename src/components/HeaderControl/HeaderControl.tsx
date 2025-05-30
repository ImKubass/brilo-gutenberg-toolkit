import React from "react"
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  PanelBody,
  TextareaControl,
  TextControl,
} from "@wordpress/components"
import {__} from "@wordpress/i18n"
import {HeaderControlProps, HEADING_LEVELS, HEADING_STYLES, HeadingLevel, HeadingStyle, Variant, VARIANTS} from "@components/HeaderControl/types"

const HeaderControl: React.FC<HeaderControlProps> = ({header, onChange, variant, removeOverline, removePerex}) => {
  return (
    <>
      <PanelBody title={__("Nadpis", "brilo-blocks")}>
        {!variant && (
          <ToggleGroupControl
            label={__("Zarovnání", "brilo-blocks")}
            value={header.variant || VARIANTS[0].value}
            onChange={(value) => {
              onChange({
                ...header,
                variant: value as Variant,
              })
            }}
            isBlock
          >
            {VARIANTS.map((variant) => (
              <ToggleGroupControlOption key={variant.value} value={variant.value} label={variant.label} />
            ))}
          </ToggleGroupControl>
        )}

        <TextControl
          label={__("Nadpis", "brilo-blocks")}
          value={header.heading.title || ""}
          onChange={(value: string) =>
            onChange({
              ...header,
              heading: {
                ...header.heading,
                title: value,
              },
            })
          }
        />

        <ToggleGroupControl
          label={__("Vzhled nadpisu", "brilo-blocks")}
          value={header.heading.style}
          onChange={(value) => {
            onChange({
              ...header,
              heading: {
                ...header.heading,
                style: value as HeadingStyle,
              },
            })
          }}
          isBlock
        >
          {HEADING_STYLES.map((style) => (
            <ToggleGroupControlOption key={style.value} value={style.value} label={style.label} />
          ))}
        </ToggleGroupControl>

        <ToggleGroupControl
          label={__("Level nadpisu", "brilo-blocks")}
          value={header.heading.level}
          onChange={(value) => {
            onChange({
              ...header,
              heading: {
                ...header.heading,
                level: value as HeadingLevel,
              },
            })
          }}
          isBlock
        >
          {HEADING_LEVELS.map((level) => (
            <ToggleGroupControlOption key={level.value} value={level.value} label={level.label} />
          ))}
        </ToggleGroupControl>
      </PanelBody>

      {!removeOverline && (
        <TextareaControl
          label={__("Perex", "brilo-blocks")}
          value={header.perex}
          onChange={(value: string) =>
            onChange({
              ...header,
              perex: value,
            })
          }
        />
      )}

      {!removeOverline && (
        <TextControl
          label={__('Text "nad čarou"', "brilo-blocks")}
          value={header.overline.title}
          onChange={(value: string) =>
            onChange({
              ...header,
              overline: {
                ...header.overline,
                title: value,
              },
            })
          }
        />
      )}
    </>
  )
}

export default HeaderControl

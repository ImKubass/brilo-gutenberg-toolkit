import React from "react"
import {RichText} from "@wordpress/block-editor"
import {__} from "@wordpress/i18n"
import {HeaderControlProps, VARIANTS} from "@components/HeaderControl/types"
import clsx from "clsx"
import "./HeaderControl.scss"

const HeaderControlEdit: React.FC<HeaderControlProps> = ({header, onChange, variant, removeOverline, removePerex}) => {
  const headerClasses = clsx("header-control-edit", `--${variant || header.variant || VARIANTS[0].value}`)
  return (
    <>
      <div className={headerClasses}>
        {!removeOverline && (
          <RichText
            identifier="overline"
            className="overline"
            tagName="p"
            value={header.overline.title}
            allowedFormats={[]}
            onChange={(value: string) =>
              onChange({
                ...header,
                overline: {
                  ...header.overline,
                  title: value,
                },
              })
            }
            placeholder={__('Text "nad čarou"', "brilo-blocks")}
            data-custom-placeholder={true}
          />
        )}

        <RichText
          identifier="title"
          className="title"
          tagName={header.heading.style}
          value={header.heading.title}
          allowedFormats={[]}
          onChange={(value: string) =>
            onChange({
              ...header,
              heading: {
                ...header.heading,
                title: value,
              },
            })
          }
          placeholder={__("Váš nadpis", "brilo-blocks")}
          data-custom-placeholder={true}
        />

        {!removePerex && (
          <RichText
            identifier="perex"
            tagName="p"
            value={header.perex}
            allowedFormats={[]}
            onChange={(value: string) =>
              onChange({
                ...header,
                perex: value,
              })
            }
            placeholder={__("Perex", "brilo-blocks")}
            data-custom-placeholder={true}
          />
        )}
      </div>
    </>
  )
}

export default HeaderControlEdit

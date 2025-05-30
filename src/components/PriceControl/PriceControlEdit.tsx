import React from "react"
import {Price} from "@components/PriceControl/types"
import {RichText} from "@wordpress/block-editor"
import "./PriceControl.scss"
interface PriceControlProps {
  price: Price
  onChange: (price: Price) => void
}

const PriceControlEdit: React.FC<PriceControlProps> = ({price, onChange}) => {
  return (
    <>
      <div className={"price-control-edit"}>
        <RichText
          className="price-control-edit__before"
          tagName="p"
          value={price.before.value}
          allowedFormats={[]}
          onChange={(value: string) =>
            onChange({
              ...price,
              before: {
                ...price.before,
                value: value,
              },
            })
          }
        />

        <div className={"price-control-edit__main-price"}>
          <RichText
            className="price-control-edit__main-title"
            tagName="p"
            value={price.main.title}
            allowedFormats={[]}
            onChange={(value: string) =>
              onChange({
                ...price,
                main: {
                  ...price.main,
                  title: value,
                },
              })
            }
          />

          <RichText
            className="price-control-edit__main"
            tagName="p"
            value={price.main.value}
            allowedFormats={[]}
            onChange={(value: string) =>
              onChange({
                ...price,
                main: {
                  ...price.main,
                  value: value,
                },
              })
            }
          />
        </div>

        <RichText
          className="price-control-edit__note"
          tagName="p"
          value={price.note}
          allowedFormats={[]}
          onChange={(value: string) =>
            onChange({
              ...price,
              note: value,
            })
          }
        />
      </div>
    </>
  )
}

export default PriceControlEdit

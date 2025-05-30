import React from "react"
import {PanelBody, TextControl} from "@wordpress/components"
import {__} from "@wordpress/i18n"
import {Price} from "@components/PriceControl/types"

interface PriceControlProps {
  price: Price
  onChange: (price: Price) => void
}

const PriceControl: React.FC<PriceControlProps> = ({price, onChange}) => {
  return (
    <PanelBody title={__("Cena", "brilo-blocks")}>
      <TextControl
        label={__("Hlavní cena", "brilo-blocks")}
        value={price.main.value}
        onChange={(value) =>
          onChange({
            ...price,
            main: {
              ...price.main,
              value: value,
            },
          })
        }
      />

      <TextControl
        label={__("Popisek hlavní ceny", "brilo-blocks")}
        value={price.main.title}
        onChange={(value) =>
          onChange({
            ...price,
            main: {
              ...price.main,
              title: value,
            },
          })
        }
      />

      <TextControl
        label={__("Cena před slevou", "brilo-blocks")}
        value={price.before.value}
        onChange={(value) =>
          onChange({
            ...price,
            before: {
              ...price.before,
              value: value,
            },
          })
        }
      />

      <TextControl label={__("Poznámka k ceně", "brilo-blocks")} value={price.note} onChange={(value) => onChange({...price, note: value})} />
    </PanelBody>
  )
}

export default PriceControl

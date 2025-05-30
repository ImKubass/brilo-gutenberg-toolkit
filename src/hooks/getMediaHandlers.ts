import {Media} from "@components/MediaControl/types"

type SetAttributesFunction = (attributes: Record<string, any>) => void

export const getMediaHandlers = <T extends Record<string, any>>(
  key: keyof T,
  setAttributes: SetAttributesFunction,
  defaultValue: T[keyof T],
) => {
  return {
    onSelect: (media: Media) => {
      setAttributes({
        [key]: {
          originalSrc: media.url,
          mediaId: media.id,
        },
      })
    },
    onRemove: () => {
      setAttributes({
        [key]: defaultValue,
      })
    },
  }
}

export default getMediaHandlers

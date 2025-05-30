import React from "react"
import {__} from "@wordpress/i18n"
import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor"
import {Button} from "@wordpress/components"
import {Image, Media} from "@components/MediaControl/types"
import {Icon, image, trash} from "@wordpress/icons"
import "./MediaControlEdit.scss"

export interface MediaControlEditProps {
  media: Image
  onSelect: (media: Media) => void
  onRemove: () => void
  width?: number
  label?: string
}

const MediaControlEdit: React.FC<MediaControlEditProps> = ({media, onSelect, onRemove, width, label}) => {
  return (
    <div className="media-control-edit editor-post-featured-image" style={{width: `${width}px`}}>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelect}
          value={media.mediaId}
          allowedTypes={["image"]}
          render={({open}: {open: () => void}) => (
            <div className={"media-control-edit__add"} onClick={open}>
              {media.mediaId === 0 && (
                <div className={"media-control-edit__placeholder"}>
                  <Icon icon={image} />
                  {label || __("Vyberte obrázek", "brilo-blocks")}
                </div>
              )}

              {media.originalSrc && <img src={media.originalSrc} alt={__("Vybraný obrázek", "brilo-blocks")} width={width} />}
            </div>
          )}
        />
      </MediaUploadCheck>

      {media.mediaId !== 0 && (
        <MediaUploadCheck>
          <Button className={"media-control-edit__remove"} onClick={onRemove} isLink isDestructive>
            <Icon icon={trash} />
          </Button>
        </MediaUploadCheck>
      )}
    </div>
  )
}

export default MediaControlEdit

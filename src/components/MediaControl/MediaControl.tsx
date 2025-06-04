import React from "react"
import {__} from "@wordpress/i18n"
import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor"
import {Button, ResponsiveWrapper} from "@wordpress/components"
import {Image, Media} from "@components/MediaControl/types"

import "./MediaControl.scss"

export interface MediaControlProps {
  media: Image
  onSelect: (media: Media) => void
  onRemove: () => void
}

const MediaControl: React.FC<MediaControlProps> = ({media, onSelect, onRemove}) => {
  return (
    <div className="media-control editor-post-featured-image">
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelect}
          value={media.mediaId}
          allowedTypes={["image"]}
          render={({open}: {open: () => void}) => (
            <Button
              className={media.mediaId === 0 ? "editor-post-featured-image__toggle" : "editor-post-featured-image__preview"}
              onClick={open}
            >
              {media.mediaId === 0 ? __("Vyberte obrázek", "brilo-blocks") : null}
              {media.originalSrc && (
                <ResponsiveWrapper naturalWidth={300} naturalHeight={200}>
                  <img src={media.originalSrc} alt={__("Vybraný obrázek", "brilo-blocks")} />
                </ResponsiveWrapper>
              )}
            </Button>
          )}
        />
      </MediaUploadCheck>

      {/* Replace and Remove Buttons */}
      {media.mediaId !== 0 && (
        <>
          <MediaUploadCheck>
            <MediaUpload
              className={"media-control__change-image"}
              onSelect={onSelect}
              value={media.mediaId}
              allowedTypes={["image"]}
              render={({open}: {open: () => void}) => <Button onClick={open}>{__("Změnit obrázek", "brilo-blocks")}</Button>}
            />
          </MediaUploadCheck>
          <MediaUploadCheck>
            <Button onClick={onRemove} isLink isDestructive>
              {__("Odstranit obrázek", "brilo-blocks")}
            </Button>
          </MediaUploadCheck>
        </>
      )}
    </div>
  )
}

export default MediaControl

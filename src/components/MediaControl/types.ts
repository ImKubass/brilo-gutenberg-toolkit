export interface Media {
  id: number
  url: string
  filesizeHumanReadable: string
  subtype: string
}

export interface Image {
  originalSrc: string
  mediaId: number
}

export const imageDefault = {
  originalSrc: "",
  mediaId: 0,
}

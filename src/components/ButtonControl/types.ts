export interface Button {
  title: string
  url: string
  blank: boolean
  modalTarget: boolean
  modalId: string
}

export const buttonDefault = {
  title: "",
  url: "",
  blank: false,
  modalTarget: false,
  modalId: "",
} as Button

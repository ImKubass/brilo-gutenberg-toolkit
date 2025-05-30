export interface Price {
  before: {
    value: string
  }
  main: {
    title: string
    value: string
  }
  note: string
}

export const priceDefault = {
  before: {
    value: "",
  },
  main: {
    title: "",
    value: "",
  },
  note: "",
  currency: "",
} as Price

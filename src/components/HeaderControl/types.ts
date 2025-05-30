import {__} from "@wordpress/i18n"

export const HEADING_STYLES = [
  {
    value: "h1",
    label: __("L", "brilo-blocks"),
  },
  {
    value: "h2",
    label: __("M", "brilo-blocks"),
  },
  {
    value: "h3",
    label: __("S", "brilo-blocks"),
  },
] as const
export const HEADING_LEVELS = [
  {
    value: "1",
    label: __("H1", "brilo-blocks"),
  },
  {
    value: "2",
    label: __("H2", "brilo-blocks"),
  },
  {
    value: "3",
    label: __("H3", "brilo-blocks"),
  },
] as const

export type HeadingStyle = (typeof HEADING_STYLES)[number]["value"]
export type HeadingLevel = (typeof HEADING_LEVELS)[number]["value"]

export type Overline = {
  title: string
}

export type Heading = {
  title: string
  level: HeadingLevel
  style: HeadingStyle
}

export const VARIANTS = [
  {
    value: "center",
    label: __("Na střed", "brilo-blocks"),
  },
  {
    value: "left",
    label: __("Vlevo", "brilo-blocks"),
  },
] as const

export type Variant = (typeof VARIANTS)[number]["value"]

export interface Header {
  overline: Overline
  heading: Heading
  perex: string
  variant: Variant
}

export const headerDefault: Header = {
  overline: {
    title: "",
  },
  heading: {
    title: "",
    level: "2",
    style: "h2",
  },
  perex: "",
  variant: VARIANTS[0].value,
}

export interface HeaderControlProps {
  header: Header
  onChange: (header: Header) => void
  variant?: string
  removeOverline?: boolean
  removePerex?: boolean
}

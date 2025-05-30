import {__} from "@wordpress/i18n"

export const HEADING_LEVELS = [
  {
    value: "2",
    label: __("H2", "brilo-blocks"),
  },
  {
    value: "3",
    label: __("H3", "brilo-blocks"),
  },
] as const

export type HeadingLevel = (typeof HEADING_LEVELS)[number]["value"]

export const HEADING_HIGHER_LEVELS = [
  {
    value: "1",
    label: __("H1", "brilo-blocks"),
  },
  {
    value: "2",
    label: __("H2", "brilo-blocks"),
  },
] as const

export type HeadingHigherLevel = (typeof HEADING_HIGHER_LEVELS)[number]["value"]

export const headingLevelDefault: string = HEADING_LEVELS[1].value

export interface HeadingLevelControlProps {
  headingLevel: HeadingLevel | HeadingHigherLevel
  headingLevelLabel?: string
  onChange: (value: HeadingLevel | HeadingHigherLevel) => void
  higherLevel?: boolean
}

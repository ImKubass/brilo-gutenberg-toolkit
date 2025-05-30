import {Button, buttonDefault} from "@components/ButtonControl/types"

export interface ButtonGroup {
  primary: Button;
  secondary: Button;
}

export const buttonGroupDefault = {
  primary: buttonDefault,
  secondary: buttonDefault
} as ButtonGroup

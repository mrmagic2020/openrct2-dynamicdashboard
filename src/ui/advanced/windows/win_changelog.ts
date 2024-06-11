import {
  Colour,
  WindowTemplate,
  label,
  listview,
  window
} from "openrct2-flexui"
import { language } from "../../../languages/lang"
import DynamicDashboard from "../../../common/plugin"

let isOpen = false
let windowTemplate: WindowTemplate

export function init() {
  windowTemplate = window({
    title: language.ui.advanced.windows.changelog.title,
    width: 1000,
    height: 400,
    colours: [Colour.DarkYellow, Colour.DarkYellow],
    content: [
      label({
        text: language.ui.advanced.windows.changelog.label.description
      }),
      listview({
        items: DynamicDashboard.changelog.split("\n"),
        scrollbars: "vertical"
      })
    ]
  })
}

export function open() {
  if (!isOpen) windowTemplate.open()
  else windowTemplate.focus()
}

import {
  Colour,
  TabWindowParams,
  WindowTemplate,
  tabwindow
} from "openrct2-flexui"
import { tab_info } from "./tabs/tab_info"
import { tab_options } from "./tabs/tab_general"
import { tab_colours } from "./tabs/tab_colours"
import { language } from "../../languages/lang"

let isOpen = false
let windowTemplate: WindowTemplate

function getWindowParams(): TabWindowParams {
  return {
    title: language.ui.advanced.title,
    position: "center",
    width: 260,
    height: 200,
    colours: [Colour.Grey, Colour.DarkYellow, Colour.DarkYellow],
    tabs: [tab_options(), tab_colours(), tab_info()],
    onTabChange: (_index) => {},
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  }
}

export function init() {
  windowTemplate = tabwindow(getWindowParams())
  ui.registerToolboxMenuItem(language.ui.advanced.toolbox_title, open)
}

export function open() {
  if (!isOpen) windowTemplate.open()
  else windowTemplate.focus()
}

export function redefine() {
  windowTemplate = tabwindow(getWindowParams())
}

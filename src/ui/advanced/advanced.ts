import { Colour, WindowTemplate, tabwindow } from "openrct2-flexui"
import { tab_info } from "./tab_info"
import { tab_options } from "./tab_general"
import { tab_colours } from "./tab_colours"
import { language } from "../../languages/lang"

let isOpen = false
let windowTemplate: WindowTemplate

export function init() {
  windowTemplate = tabwindow({
    title: language.ui.advanced.title,
    position: "center",
    width: 260,
    height: 200,
    colours: [Colour.Grey, Colour.DarkYellow, Colour.DarkYellow],
    tabs: [tab_options(), tab_colours(), tab_info()],
    onTabChange: (_index) => {},
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  })
}

export function open() {
  if (!isOpen) windowTemplate.open()
  else windowTemplate.focus()
}

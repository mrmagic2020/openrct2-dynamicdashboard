import {
  button,
  colourPicker,
  groupbox,
  horizontal,
  label,
  tab
} from "openrct2-flexui"
import Animations from "../../generic/animations"
import { language } from "../../../languages/lang"
import { baseData } from "../../../data/main"

export const tab_colours = function () {
  return tab({
    height: "auto",
    image: Animations.TAB_COLOURS,
    content: [
      groupbox({
        text: language.ui.advanced.tabs.colours.groupbox.title,
        content: [
          // Primary colour
          horizontal([
            label({
              text: language.ui.advanced.tabs.colours.label.primary
            }),
            colourPicker({
              height: 14,
              colour: baseData.global.colour_scheme.primary.store,
              onChange: (colour) => {
                baseData.global.colour_scheme.primary.store.set(colour)
              }
            })
          ]),
          // Secondary colour
          horizontal([
            label({
              text: language.ui.advanced.tabs.colours.label.secondary
            }),
            colourPicker({
              height: 14,
              colour: baseData.global.colour_scheme.secondary.store,
              onChange: (colour) => {
                baseData.global.colour_scheme.secondary.store.set(colour)
              }
            })
          ]),
          // Progressbar normal colour
          horizontal([
            label({
              text: language.ui.advanced.tabs.colours.label.progressbar_normal
            }),
            colourPicker({
              height: 14,
              colour: baseData.global.colour_scheme.progressbar_normal.store,
              onChange: (colour) => {
                baseData.global.colour_scheme.progressbar_normal.store.set(
                  colour
                )
              }
            })
          ]),
          // Progressbar warning colour
          horizontal([
            label({
              text: language.ui.advanced.tabs.colours.label.progressbar_warning
            }),
            colourPicker({
              height: 14,
              colour: baseData.global.colour_scheme.progressbar_warning.store,
              onChange: (colour) => {
                baseData.global.colour_scheme.progressbar_warning.store.set(
                  colour
                )
              }
            })
          ]),
          // Reset colours button
          button({
            text: language.ui.advanced.tabs.colours.button.reset,
            height: 14,
            padding: { top: 10 },
            onClick: () => {
              baseData.global.colour_scheme.primary.reset()
              baseData.global.colour_scheme.secondary.reset()
              baseData.global.colour_scheme.progressbar_normal.reset()
              baseData.global.colour_scheme.progressbar_warning.reset()
            }
          })
        ]
      })
    ]
  })
}

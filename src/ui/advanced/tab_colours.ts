import { colourPicker, groupbox, horizontal, label, tab } from "openrct2-flexui"
import Animations from "../generic/animations"
import { language } from "../../languages/lang"
import { baseData } from "../../data/main"

export const tab_colours = function () {
  return tab({
    height: "auto",
    image: Animations.TAB_COLOURS,
    content: [
      groupbox({
        text: language.ui.advanced.tabs.colours.groupbox.title,
        content: [
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
          ])
        ]
      })
    ]
  })
}

import { button, horizontal, label, tab, vertical } from "openrct2-flexui"
import Animations from "../../generic/animations"
import { language } from "../../../languages/lang"
import DynamicDashboard from "../../../common/plugin"
import * as Changelog from "../windows/win_changelog"

export const tab_info = function () {
  return tab({
    height: "auto",
    image: Animations.TAB_INFO,
    content: [
      vertical({
        padding: { top: 10 },
        spacing: 10,
        content: [
          // Description
          label({
            text: language.ui.advanced.tabs.info.label.description,
            alignment: "centred"
          }),
          // Licence
          horizontal([
            label({
              width: 60,
              text: language.ui.advanced.tabs.info.label.licence
            }),
            label({
              text: "{WHITE}" + DynamicDashboard.licence
            })
          ]),
          // Version
          horizontal([
            label({
              width: 60,
              text: language.ui.advanced.tabs.info.label.version
            }),
            label({
              text: "{WHITE}" + DynamicDashboard.version
            })
          ]),
          // Author
          horizontal([
            label({
              width: 60,
              text: language.ui.advanced.tabs.info.label.author
            }),
            label({
              text: "{WHITE}" + DynamicDashboard.authors.join(", ")
            })
          ]),
          // Special thanks
          horizontal([
            label({
              width: 60,
              text: language.ui.advanced.tabs.info.label.special_thanks
            }),
            label({
              height: 14 * 3,
              text: "{WHITE}" + DynamicDashboard.specialThanksWrapped
            })
          ]),
          // GitHub
          horizontal([
            label({
              width: 60,
              text: language.ui.advanced.tabs.info.label.github
            }),
            label({
              height: 28,
              text: "{WHITE}" + DynamicDashboard.urlWrapped
            })
          ]),
          // Changelog
          button({
            width: 68,
            height: 14,
            text: language.ui.advanced.tabs.info.button.changelog,
            onClick: () => {
              Changelog.open()
            }
          })
        ]
      })
    ]
  })
}

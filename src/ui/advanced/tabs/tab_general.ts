import { button, groupbox, tab } from "openrct2-flexui"
import Animations from "../../generic/animations"
import { language } from "../../../languages/lang"
import WarningWindow from "../../generic/warning"
import Data from "../../../data"

export const tab_options = function () {
  return tab({
    height: "auto",
    image: Animations.TAB_GENERAL,
    content: [
      groupbox({
        text: language.ui.advanced.tabs.general.groupbox.title,
        content: [
          // Delete all data button
          button({
            text: language.ui.advanced.tabs.general.label.delete_data,
            height: 28,
            onClick: () => {
              WarningWindow.show({
                id: "delete_all_data",
                title: language.ui.generic.warning.delete_all_data.title,
                message: language.ui.generic.warning.delete_all_data.message,
                cancelButton:
                  language.ui.generic.warning.delete_all_data.cancel,
                confirmButton:
                  language.ui.generic.warning.delete_all_data.confirm,
                onConfirm: () => {
                  Data.reset()
                }
              })
            }
          })
        ]
      })
    ]
  })
}

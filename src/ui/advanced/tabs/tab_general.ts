import {
  button,
  checkbox,
  groupbox,
  horizontal,
  label,
  spinner,
  tab
} from "openrct2-flexui"
import Animations from "../../generic/animations"
import { language } from "../../../languages/lang"
import WarningWindow from "../../generic/windows/warning"
import Data from "../../../data"
import { baseData } from "../../../data/main"

let temp_frequency: number = baseData.global.update_frequency.store.get()

export const tab_options = function () {
  return tab({
    height: "auto",
    image: Animations.TAB_GENERAL,
    content: [
      groupbox({
        text: language.ui.advanced.tabs.general.groupbox.title,
        content: [
          // Set update frequency label
          label({
            text: language.ui.advanced.tabs.general.label.set_frequency
          }),
          // Set update frequency button + spinner
          horizontal({
            content: [
              spinner({
                height: 14,
                width: "50%",
                value: baseData.global.update_frequency.store,
                minimum: 1,
                onChange: (value) => {
                  temp_frequency = value
                },
                format: (value) => {
                  return context.formatString("{DURATION}", value)
                }
              }),
              button({
                text: language.ui.advanced.tabs.general.button.set_frequency,
                height: 14,
                width: "25%",
                onClick: () => {
                  baseData.global.update_frequency.store.set(temp_frequency)
                }
              })
            ]
          }),
          // Show advanced statistics checkbox
          checkbox({
            text: language.ui.advanced.tabs.general.checkbox
              .show_advanced_statistics,
            isChecked: baseData.global.show_advanced_statistics.store,
            onChange: (value) => {
              baseData.global.show_advanced_statistics.store.set(value)
            }
          }),
          // Delete all data button
          button({
            text: language.ui.advanced.tabs.general.label.delete_data,
            height: 14,
            width: "50%",
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

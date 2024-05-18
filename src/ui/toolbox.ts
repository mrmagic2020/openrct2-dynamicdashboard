import { window, label, spinner } from "openrct2-flexui"
import { language } from "../languages/lang"
import { baseData } from "../data/main"

/**
 * Records whether the toolbox menu is open.
 */
let isOpen = false

function initToolboxMenu(): void {
  ui.registerToolboxMenuItem(language.ui.toolbox.title, toolboxMenu)
}

/**
 * Toolbox menu.
 *
 * @returns {void}
 */
function toolboxMenu(): void {
  const win_template = window({
    title: language.ui.toolbox.title,
    width: 200,
    height: 100,
    position: "center",
    content: [
      // label({
      //   text: language.ui.toolbox.language_selection_label
      // }),
      // dropdown({
      //   items: languageList,
      //   selectedIndex: baseData.global.language_index,
      //   onChange: (index: number) => {
      //     baseData.global.language_index.set(index)
      //     win_template.close()
      //   }
      // }),
      label({
        text: language.ui.toolbox.update_ratio_spinner
      }),
      spinner({
        value: baseData.global.update_ratio,
        minimum: 1,
        format: (value) =>
          value.toString() +
          " " +
          language.ui.toolbox.update_ratio_spinner_unit,
        onChange: (value: number) => {
          baseData.global.update_ratio.set(value)
        }
      })
    ],
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  })
  if (!isOpen) win_template.open()
  else win_template.focus()
}

export { initToolboxMenu }

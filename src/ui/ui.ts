import Environment from "../common/environment"
import Logger from "../utils/logger"
import { initMainMenu, openMainMenu } from "./main"
import { initToolboxMenu } from "./toolbox"

namespace UI {
  /**
   * Initialises the user interface.
   *
   * @returns {void}
   */
  export function init(): void {
    Logger.assert(Environment.isUiAvailable, "UI is not available.")
    initMainMenu()
    initToolboxMenu()
    ui.registerShortcut({
      id: "dynamicdashboard.main.open",
      text: "Open Dynamic Dashboard",
      bindings: ["SHIFT+D"],
      callback: () => {
        openMainMenu()
      }
    })
  }
}

export default UI

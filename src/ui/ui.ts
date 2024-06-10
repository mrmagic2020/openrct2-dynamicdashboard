import Environment from "../common/environment"
import Logger from "../utils/logger"
import * as Main from "./main"
import * as Toolbox from "./toolbox"

namespace UI {
  /**
   * Initialises the user interface.
   *
   * @returns {void}
   */
  export function init(): void {
    Logger.assert(Environment.isUiAvailable, "UI is not available.")
    Main.init()
    Toolbox.init()
    ui.registerShortcut({
      id: "dynamicdashboard.main.open",
      text: "Open Dynamic Dashboard",
      bindings: ["SHIFT+D"],
      callback: () => {
        Main.open()
      }
    })
  }
}

export default UI

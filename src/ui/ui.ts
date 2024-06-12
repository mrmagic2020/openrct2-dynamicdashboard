import Environment from "../common/environment"
import Logger from "../utils/logger"
import * as Main from "./main"
import * as Toolbox from "./toolbox"
import * as Advanced from "./advanced/advanced"
import * as Changelog from "./advanced/windows/win_changelog"

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
    Advanced.init()
    Changelog.init()
    ui.registerShortcut({
      id: "dynamicdashboard.main.open",
      text: "Open Dynamic Dashboard",
      bindings: ["SHIFT+D"],
      callback: () => {
        if (context.mode === "normal") Main.open()
        else if (context.mode === "title") Advanced.open()
      }
    })
  }
}

export default UI

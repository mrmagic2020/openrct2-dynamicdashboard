import { initMainMenu, openMainMenu } from "./main"
import { initToolboxMenu } from "./toolbox"

/**
 * Initialises the user interface.
 *
 * @returns {void}
 */
function initUI(): void {
  if (typeof ui === "undefined") return
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

export { initUI }

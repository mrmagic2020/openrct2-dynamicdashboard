import { initMainMenu } from "./main"
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
}

export { initUI }

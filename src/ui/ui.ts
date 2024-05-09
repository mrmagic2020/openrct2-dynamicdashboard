import { initMainMenu } from "./main"
import { initToolboxMenu } from "./toolbox"

/**
 * Initialises the user interface.
 *
 * @returns {void}
 */
function initUI(): void {
  initMainMenu()
  initToolboxMenu()
}

export { initUI }

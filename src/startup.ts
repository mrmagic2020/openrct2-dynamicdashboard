import { initCurrencyData } from "./data/currency"
import { initLang_new } from "./languages/lang"
import { initUI } from "./ui/ui"
import Data from "./data"
import Environment from "./common/environment"
import Logger from "./utils/logger"
/**
 * Startup function. Calls all the initialisation functions.
 */
export function startup(): void {
  Logger.debug(`Starting up in ${Environment.buildConfiguration} mode...`)
  Logger.assert(Environment.isUiAvailable, "UI is not available.")

  initLang_new()
  initCurrencyData()

  Data.init()

  initUI()
}

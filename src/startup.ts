import { initCurrencyData } from "./data/currency"
import { initLang_new } from "./languages/lang"
import { initUI } from "./ui/ui"
import Data from "./data"

/**
 * Startup function. Calls all the initialisation functions.
 */
export function startup(): void {
  initLang_new()
  initCurrencyData()

  Data.init()

  initUI()
}

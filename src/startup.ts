import { initLang_new } from "./languages/lang"
import UI from "./ui/ui"
import Data from "./data"
import Environment from "./common/environment"
import Logger from "./utils/logger"
import Server from "./socket/server"
import HookManager from "./utils/hooks"
import Tick from "./common/tick"
import DynamicDashboard from "./common/plugin"
/**
 * Startup function. Calls all the initialisation functions.
 */
export function startup(): void {
  Logger.debug(`Starting up in ${Environment.buildConfiguration} mode...`)
  Logger.assert(Environment.isUiAvailable, "UI is not available.")

  Tick.init()

  Server.init()

  initLang_new()

  Data.init()

  UI.init()

  HookManager.activate()

  Logger.debug(`Startup complete: ${DynamicDashboard.version}`)
}

import { initLang_new } from "./languages/lang"
import UI from "./ui/ui"
import Data from "./data"
import Environment from "./common/environment"
import Logger from "./utils/logger"
import Server from "./socket/server"
import HookManager from "./utils/hooks"
import DynamicDashboard from "./common/plugin"
import Performance from "./utils/performance"

/**
 * Startup function. Calls all the initialisation functions.
 */
export function startup(): void {
  Logger.debug(`Starting up in ${Environment.buildConfiguration} mode...`)
  Logger.assert(Environment.isUiAvailable, "UI is not available.")

  const gPerformance = new Performance()
  const _peformance = new Performance()

  gPerformance.start()

  _peformance.start()
  Server.init()
  Logger.debug(`Server started in ${_peformance.end()}ms`)

  _peformance.start()
  initLang_new()
  Logger.debug(`Languages loaded in ${_peformance.end()}ms`)

  _peformance.start()
  Data.init()
  Logger.debug(`Data loaded in ${_peformance.end()}ms`)

  _peformance.start()
  UI.init()
  Logger.debug(`UI loaded in ${_peformance.end()}ms`)

  HookManager.activate()

  Logger.debug(
    `Startup complete in ${gPerformance.end()}ms: ${DynamicDashboard.version}`
  )
}

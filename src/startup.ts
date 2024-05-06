import { initCurrencyData } from "./data/currency"
import { initGuestData } from "./data/guest"
import { baseData, initData } from "./data/main"
import { initParkAndScenarioData } from "./data/park_and_scenario"
import { initPlayerData } from "./data/player"
import { initRideData } from "./data/rides"
import { initLang, language } from "./languages"
import { menu } from "./ui/main"
import { toolboxMenu } from "./ui/toolbox"

/**
 * Startup function. Calls all the initialization functions.
 */
export function startup(): void {
  /**
   * Initialize data.
   */
  initLang()
  initData()
  initCurrencyData()
  initPlayerData()
  initParkAndScenarioData()
  initRideData()
  initGuestData()

  /**
   * Restore stored data after entering new scenario.
   *
   * ***IMPOERTANT:***
   * Intransient plugins remained loaded all the time,
   * thus all the data need to be reset after quitting a scenario.
   */
  context.subscribe("map.changed", () => {
    if (context.mode === "normal") {
      console.log("New scenario.")
      for (let key in baseData.local.player) {
        baseData.local.player[key].store.set(
          context.getParkStorage().get(baseData.local.player[key].key, 0)
        )
      }
      for (let key in baseData.local.park_and_scenario) {
        baseData.local.park_and_scenario[key].store.set(
          context
            .getParkStorage()
            .get(baseData.local.park_and_scenario[key].key, 0)
        )
      }
      for (let key in baseData.local.rides) {
        baseData.local.rides[key].store.set(
          context.getParkStorage().get(baseData.local.rides[key].key, 0)
        )
      }
      for (let key in baseData.local.guest) {
        baseData.local.guest[key].store.set(
          context.getParkStorage().get(baseData.local.guest[key].key, 0)
        )
      }
    }
  })

  if (typeof ui !== "undefined") {
    ui.registerToolboxMenuItem(language.ui.toolbox.title, toolboxMenu)
    ui.registerMenuItem(language.ui.main.title, menu)
  }
}

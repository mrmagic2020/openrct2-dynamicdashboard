import { initCurrencyData } from "./data/currency"
import { initGuestData } from "./data/guest"
import { baseData, initData } from "./data/main"
import { initParkAndScenarioData } from "./data/park_and_scenario"
import { initPlayerData } from "./data/player"
import { initStallsAndFacilitiesData } from "./data/stalls_and_facilities"
import { initRideData } from "./data/rides"
// import { initLang } from "./languages"
import { initLang_new, language } from "./languages/lang"
import { menu } from "./ui/main"
import { toolboxMenu } from "./ui/toolbox"

/**
 * Initialises the user interface.
 *
 * @returns {void}
 */
function initUI(): void {
  if (typeof ui !== "undefined") {
    ui.registerToolboxMenuItem(language.ui.toolbox.title, toolboxMenu)
    ui.registerMenuItem(language.ui.main.title, menu)
  }
}

/**
 * Subscribes to the map change event and restore stored data after entering new scenario.
 *
 * **Important:**
 * Intransient plugins remained loaded all the time,
 * thus all the data need to be reset after quitting a scenario.
 *
 * @returns {void}
 */
function onMapChanged(): void {
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
      for (let key in baseData.local.stalls_and_facilities) {
        baseData.local.stalls_and_facilities[key].store.set(
          context
            .getParkStorage()
            .get(baseData.local.stalls_and_facilities[key].key, 0)
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
}

/**
 * Startup function. Calls all the initialisation functions.
 */
export function startup(): void {
  /**
   * Initialise data.
   */

  initLang_new()
  // initLang()
  initData()
  initCurrencyData()
  initPlayerData()
  initParkAndScenarioData()
  initStallsAndFacilitiesData()
  initRideData()
  initGuestData()

  initUI()

  onMapChanged()
}

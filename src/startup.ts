import { initCurrencyData } from "./data/currency";
import { baseData, initData } from "./data/main";
import { initParkAndScenarioData } from "./data/park_and_scenario/park_and_scenario";
import { initPlayerData } from "./data/player/player";
import { initLang, language } from "./languages";
import { menu } from "./ui/main";
import { toolboxMenu } from "./ui/toolbox"

export function startup() {
  /**
   * Initialize data.
   */
  initLang();
  initData();
  initCurrencyData();
  initPlayerData();
  initParkAndScenarioData();

  /**
   * Restore stored data after entering new scenario. 
   * 
   * Intransient plugins remained loaded all the time, 
   * thus all the data need to be reset after quitting a scenario. 
   */
  context.subscribe("map.changed", () => {
    if (context.mode === "normal") {
      console.log("New scenario.");
      for (let key in baseData.local.player) {
        baseData.local.player[key].store.set(context.getParkStorage().get(baseData.local.player[key].key, 0));
      }
    }
  });

	if (typeof ui !== "undefined")
	{
    ui.registerToolboxMenuItem(language.ui.toolbox.title, toolboxMenu);
		ui.registerMenuItem(language.ui.main.title, menu);
	}
}

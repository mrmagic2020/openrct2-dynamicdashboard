import { dataStructure, initData } from "./data";
import { initPlayerData } from "./data/player/player";
import { initLang, language } from "./languages";
import { menu } from "./ui/main";
import { toolboxMenu } from "./ui/toolbox"

export function startup() {
  /**
   * Init all files.
   */
  initLang();
  initData();
  initPlayerData();

  /**
   * Restore stored data after entering new scenario. 
   */
  context.subscribe("map.changed", () => {
    if (context.mode === "normal") {
      console.log("New scenario.");
      for (let key in dataStructure.local.player) {
        dataStructure.local.player[key].store.set(context.getParkStorage().get(dataStructure.local.player[key].key, 0));
      }
    }
  });

	if (typeof ui !== "undefined")
	{
    ui.registerToolboxMenuItem(language.ui.toolbox.title, toolboxMenu);
		ui.registerMenuItem(language.ui.main.title, menu);
	}
}

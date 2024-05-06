import { baseData } from "./main";

interface ActionClass {
  [key: string]: string[]
};

/**
 * Classifications of all recorded actions. 
 * 
 * Keys **must** be indentical to that of `baseData.local.player`
 * 
 * @see baseData.local.player
 */
const actionClass: ActionClass = {
  action_track_design: ["trackdesign", "trackplace", "trackremove", "tracksetbrakespeed"],
  action_stall_and_facility_placement: ["ridecreate", "ridedemolish"],
  action_footpath_placement: ["footpathplace", "footpathremove"],
  action_scenery_placement: ["smallsceneryplace", "smallsceneryremove", "wallplace", "wallremove", "bannerplace", "bannerremove", "footpathadditionplace", "footpathadditionremove"],
  action_landscaping: ["landlower", "landraise", "landsmooth", "waterlower", "waterraise"],
  action_staff: ["stafffire", "staffhire", "staffsetcolour", "staffsetcostume", "staffsetname", "staffsetorders", "staffsetpatrolarea"],
  action_relocate_peep: ["peeppickup"],
  action_pop_balloon: ["balloonpress"],
  action_set_cheats: ["cheatset"]
};

function initPlayerData(): void {
  /**
   * Real-time game time recording (minutes). Updates every 15 seconds. 
   */
  context.setInterval(() => {
    baseData.local.player.game_time_real.store.set(baseData.local.player.game_time_real.store.get() + 0.25);
  }, 15 * 1000);

  /**
   * In-game game time recording (days). Hooks to day interval. 
   */
  context.subscribe("interval.day", () => {
    baseData.local.player.game_time_fake.store.set(baseData.local.player.game_time_fake.store.get() + 1);
  });

  context.subscribe("action.execute", (e) => {
    if (!e.isClientOnly) {
      // console.log(e.action);
      
      /**
       * Iterate throught every action classification. 
       */
      for (let key in actionClass) {
        if (actionClass[key].indexOf(e.action) !== -1) {
          baseData.local.player[key].store.set(baseData.local.player[key].store.get() + 1);
        }
      }
    }
  });

  context.subscribe("network.join", (e) => {
    if (e.player === network.currentPlayer.id) {
      baseData.local.player.action_server_join.store.set(baseData.local.player.action_server_join.store.get() + 1);
    }
  });

  context.subscribe("network.chat", (e) => {
    if (e.player === network.currentPlayer.id) {
      baseData.local.player.action_server_chat.store.set(baseData.local.player.action_server_chat.store.get() + 1);
    }
  })
}

export { initPlayerData }

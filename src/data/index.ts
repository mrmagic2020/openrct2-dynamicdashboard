import {
  WritableStore,
  store,
  twoway
} from "openrct2-flexui";

interface DataStructure {
  global: {
    language: WritableStore<"en_US" | "zh_CN">;
    language_index: WritableStore<number>;
  };
  local: {
    player: {
      [key: string]: {
        key: string;
        store: WritableStore<number>;
      };
    };
  };
}

/**
 * The unique ID for players in servers. Used to identify different player data. 
 * 
 * Set to empty string if offline. 
 */
const PLID = network.mode === "none" ? "" : network.currentPlayer.id;

/**
 * Global data prefix. 
 */
const GOBAL = "dynamicdashboard_global";

/**
 * Local data prefix. 
 */
const LOCAL = PLID + "dynamicdashboard";

/**
 * Data structure for access to all data. 
 */
const dataStructure : DataStructure = {
  global: {
    language: store<"en_US" | "zh_CN">(context.sharedStorage.get(GOBAL + ".language", "en_US")),
    language_index: twoway(store<number>(context.sharedStorage.get(GOBAL + ".language_index", 0))).twoway
  },
  local: {
    player: {
      game_time_real: {
        key: LOCAL + ".game_time_real",
        store: store<number>(context.getParkStorage().get(LOCAL + ".game_time_real", 0))
      },
      game_time_fake: {
        key: LOCAL + ".game_time_fake",
        store: store<number>(context.getParkStorage().get(LOCAL + ".game_time_fake", 0))
      },
      action_track_design: {
        key: LOCAL + ".action_track_design",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_track_design", 0))
      },
      action_stall_and_facility_placement: {
        key: LOCAL + ".action_stall_and_facility_placement",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_stall_and_facility_placement", 0))
      },
      action_footpath_placement: {
        key: LOCAL + ".action_footpath_placement",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_footpath_placement", 0))
      },
      action_scenery_placement: {
        key: LOCAL + ".action_scenery_placement",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_scenery_placement", 0))
      },
      action_landscaping: {
        key: LOCAL + ".action_landscaping",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_landscaping", 0))
      },
      action_staff: {
        key: LOCAL + ".action_staff",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_staff", 0))
      },
      action_relocate_peep: {
        key: LOCAL + ".action_relocate_peep",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_relocate_peep", 0))
      },
      action_pop_balloon: {
        key: LOCAL + ".action_pop_balloon",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_pop_balloon", 0))
      },
      action_set_cheats: {
        key: LOCAL + ".action_set_cheats",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_set_cheats", 0))
      },
      action_server_join: {
        key: LOCAL + ".action_server_join",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_server_join", 0))
      },
      action_server_chat: {
        key: LOCAL + ".action_server_chat",
        store: store<number>(context.getParkStorage().get(LOCAL + ".action_server_chat", 0))
      }
    }
  }
}

function initData() {
  /**
   * Iterate throught every data unit to subscribe stored data to park storage. 
   */
  for (let key in dataStructure.local.player) {
    dataStructure.local.player[key].store.subscribe((value) => {
      context.getParkStorage().set(dataStructure.local.player[key].key, value);
    });
  }
}

export { dataStructure, initData }

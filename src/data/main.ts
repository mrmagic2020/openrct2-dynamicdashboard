import {
  WritableStore,
  compute,
  store,
  twoway
} from "openrct2-flexui";

interface BaseData {
  global: {
    /**
     * **Language code ordered according to `index`.**
     * @see `./src/languages/index.ts`
     */
    language: WritableStore<"en_US" | "zh_CN">;
    language_index: WritableStore<number>;
    update_ratio: WritableStore<number>;
  };
  local: {
    player: {
      [key: string]: {
        key: string;
        store: WritableStore<number>;
      };
    };
    park_and_scenario: {
      [key: string]: {
        key: string;
        store: WritableStore<number>;
      };
    }
  };
}

interface BranchData {
  global: {},
  local: {
    park_and_scenario: {
      [key: string]: {
        key: string,
        store: WritableStore<any>
      }[]
    }
  }
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
 * Branch data prefix.
 */
const BRANCH = LOCAL + ".branch";

/**
 * Branch data object for access to all data for calculations.
 */
const branchData: BranchData = {
  global: {},
  local: {
    park_and_scenario: {
      park_rating_ave: [
        {
          key: BRANCH + ".park_rating_ave_sample_count",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_ave_sample_count", 0))
        },
        {
          key: BRANCH + ".park_rating_ave_sum",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_ave_sum", 0))
        }
      ],
      park_rating_year_ave: [
        {
          key: BRANCH + ".park_rating_year_ave_sample_count",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sample_count", 0))
        },
        {
          key: BRANCH + ".park_rating_year_ave_sum",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sum", 0))
        }
      ],
      park_rating_month_ave: [
        {
          key: BRANCH + ".park_rating_year_ave_sample_count",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sample_count", 0))
        },
        {
          key: BRANCH + ".park_rating_year_ave_sum",
          store: store<number>(context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sum", 0))
        }
      ]
    }
  }
};

/**
 * Base data object for access to all data to be displayed. 
 */
const baseData : BaseData = {
  global: {
    language: store<"en_US" | "zh_CN">(context.sharedStorage.get(GOBAL + ".language", "en_US")),
    language_index: twoway(store<number>(context.sharedStorage.get(GOBAL + ".language_index", 0))).twoway,
    update_ratio: twoway(store<number>(context.sharedStorage.get(GOBAL + ".update_ratio", 10))).twoway
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
    },
    park_and_scenario: {
      park_value: {
        key: LOCAL + ".park_value",
        store: store<number>(context.getParkStorage().get(LOCAL + ".park_value", 0))
      },
      park_size: {
        key: LOCAL + ".park_size",
        store: store<number>(context.getParkStorage().get(LOCAL + ".park_size", 0))
      },
      park_rating: {
        key: LOCAL + ".park_rating",
        store: store<number>(context.getParkStorage().get(LOCAL + ".park_rating", 999))
      },
      /**
       * Average stores are computed from two branch stores. 
       * Whenever one of the parent stores dispaches an update, the child store 
       * recomputes itself. 
       */
      park_rating_ave: {
        key: LOCAL + ".park_rating_ave",
        store: compute(branchData.local.park_and_scenario.park_rating_ave[0].store, branchData.local.park_and_scenario.park_rating_ave[1].store, () => {
          return parseFloat((branchData.local.park_and_scenario.park_rating_ave[1].store.get() / branchData.local.park_and_scenario.park_rating_ave[0].store.get()).toFixed(2));
        }),
      },
      park_rating_year_ave: {
        key: LOCAL + ".park_rating_year_ave",
        store: compute(branchData.local.park_and_scenario.park_rating_year_ave[0].store, branchData.local.park_and_scenario.park_rating_year_ave[1].store, () => {
          return parseFloat((branchData.local.park_and_scenario.park_rating_year_ave[1].store.get() / branchData.local.park_and_scenario.park_rating_year_ave[0].store.get()).toFixed(2));
        })
      },
      park_rating_month_ave: {
        key: LOCAL + ".park_rating_month_ave",
        store: compute(branchData.local.park_and_scenario.park_rating_month_ave[0].store, branchData.local.park_and_scenario.park_rating_month_ave[1].store, () => {
          return parseFloat((branchData.local.park_and_scenario.park_rating_month_ave[1].store.get() / branchData.local.park_and_scenario.park_rating_month_ave[0].store.get()).toFixed(2));
        })
      },

      entity_count_total: {
        key: LOCAL + ".entity_count_total",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_total", map.numEntities))
      },
      entity_count_guest: {
        key: LOCAL + ".entity_count_guest",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_guest", map.getAllEntities("guest").length))
      },
      entity_count_staff: {
        key: LOCAL + ".entity_count_staff",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_staff", map.getAllEntities("staff").length))
      },
      entity_count_balloon: {
        key: LOCAL + ".entity_count_balloon",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_balloon", map.getAllEntities("balloon").length))
      },
      entity_count_duck: {
        key: LOCAL + ".entity_count_duck",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_duck", map.getAllEntities("duck").length))
      },
      entity_count_litter: {
        key: LOCAL + ".entity_count_litter",
        store: store<number>(context.getParkStorage().get(LOCAL + ".entity_count_litter", map.getAllEntities("litter").length))
      },

      reseach_invented_items: {
        key: LOCAL + ".research_invented_items",
        store: store<number>(context.getParkStorage().get(LOCAL + ".research_invented_items", park.research.inventedItems.length))
      },
      reseach_uninvented_items: {
        key: LOCAL + ".reseach_uninvented_items",
        store: store<number>(context.getParkStorage().get(LOCAL + ".reseach_uninvented_items", park.research.uninventedItems.length))
      }
    }
  }
};

function initData() {
  /**
   * Iterate throught every data unit to automatically write data to 
   * local file whenever the store receives an update. 
   */

  baseData.global.update_ratio.subscribe((value) => {
    context.sharedStorage.set(GOBAL + ".update_ratio", value);
  });

  for (let key in baseData.local.player) {
    baseData.local.player[key].store.subscribe((value) => context.getParkStorage().set(baseData.local.player[key].key, value));
  }

  for (let key in baseData.local.park_and_scenario) {
    baseData.local.park_and_scenario[key].store.subscribe((value) => context.getParkStorage().set(baseData.local.park_and_scenario[key].key, value));
  }

  for (let key in branchData.local.park_and_scenario) {
    branchData.local.park_and_scenario[key].forEach(item => item.store.subscribe((value) => context.getParkStorage().set(item.key, value)));
  }
}

export { baseData, branchData, initData }

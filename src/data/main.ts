import { WritableStore, compute, store, twoway } from "openrct2-flexui"
import { Options } from "./options"
import IntervalManager from "../utils/interval"
import Logger from "../utils/logger"

/**
 * Represents a data entry with a key, optional temporary flag, default value, and a writable store.
 * @template T - The type of the data entry value.
 */
interface DataEntry<T> {
  /**
   * The key to store the data in the park storage.
   */
  key: string

  /**
   * Whether the data is temporary and should not be stored in the park storage.
   */
  temporary?: boolean

  /**
   * The default value of the data entry. Used when resetting the data.
   */
  default?: T

  /**
   * The writable store for the data entry.
   */
  store: WritableStore<T>
}

/**
 * Represents a dataset with keys of type `U` and values of type `DataEntry<T>`.
 * @template T - The type of the dataset values.
 * @template U - The type of the dataset keys, which can be `string`, `number`, or `symbol`.
 */
type DataSet<T, U extends string> = {
  [key in U]: DataEntry<T>
}

/**
 * Represents a group of data sets, where each data set is associated with a specific data type.
 */
type DataGroup = {
  [key in DataType]: key extends "player"
    ? DataSet<number, PlayerDataType>
    : key extends "park_and_scenario"
      ? DataSet<number, ParkAndScenarioDataType>
      : key extends "stalls_and_facilities"
        ? DataSet<number, StallsAndFacilitiesDataType>
        : key extends "rides"
          ? DataSet<number, RidesDataType>
          : key extends "guest"
            ? DataSet<number, GuestDataType>
            : key extends "finance"
              ? DataSet<number, FinanceDataType>
              : key extends "options"
                ? DataSet<number, OptionsDataType>
                : never
}

/**
 * Represents a group of branch data types.
 */
type BranchDataGroup = {
  [key in BranchDataType]: key extends "park_and_scenario"
    ? DataSet<number, ParkAndScenarioBranchDataType>
    : key extends "rides"
      ? DataSet<number, RidesBranchDataType>
      : key extends "guest"
        ? DataSet<number, GuestBranchDataType>
        : key extends "finance"
          ? DataSet<number, FinanceBranchDataType>
          : key extends "utils"
            ? DataSet<number, UtilsBranchDataType>
            : never
}

interface BaseData {
  global: {
    update_frequency: WritableStore<number>
  }
  local: DataGroup
}

interface BranchData {
  global: {}
  local: BranchDataGroup
}

/**
 * The unique ID for players in servers. Used to identify different player data.
 *
 * Set to empty string if offline.
 */
const PLID = network.mode === "none" ? "" : network.currentPlayer.id

/**
 * Global data prefix.
 */
const GOBAL = "dynamicdashboard_global"

/**
 * Local data prefix.
 */
const LOCAL = PLID + "dynamicdashboard"

/**
 * Branch data prefix.
 */
const BRANCH = LOCAL + ".branch"

/**
 * Branch data object for access to all data for calculations.
 *
 * This is used to store data that is used to calculate other data.
 * Accessed by BaseData to compute average values.
 * @see BaseData
 */
const branchData: BranchData = {
  global: {},
  local: {
    utils: {
      last_updated_month: {
        key: BRANCH + ".last_updated_month",
        store: store<number>(
          context
            .getParkStorage()
            .get(BRANCH + ".last_updated_month", date.month)
        )
      },
      last_updated_year: {
        key: BRANCH + ".last_updated_year",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".last_updated_year", date.year)
        )
      }
    },
    park_and_scenario: {
      park_rating_ave_sample_count: {
        key: BRANCH + ".park_rating_ave_sample_count",
        store: store<number>(
          context
            .getParkStorage()
            .get(BRANCH + ".park_rating_ave_sample_count", 0)
        )
      },
      park_rating_ave: {
        key: BRANCH + ".park_rating_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".park_rating_ave_sum", 0)
        )
      },
      park_rating_year_ave_sample_count: {
        key: BRANCH + ".park_rating_year_ave_sample_count",
        store: store<number>(
          context
            .getParkStorage()
            .get(BRANCH + ".park_rating_year_ave_sample_count", 0)
        )
      },
      park_rating_year_ave: {
        key: BRANCH + ".park_rating_year_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sum", 0)
        )
      },
      park_rating_month_ave_sample_count: {
        key: BRANCH + ".park_rating_year_ave_sample_count",
        store: store<number>(
          context
            .getParkStorage()
            .get(BRANCH + ".park_rating_year_ave_sample_count", 0)
        )
      },
      park_rating_month_ave: {
        key: BRANCH + ".park_rating_year_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".park_rating_year_ave_sum", 0)
        )
      }
    },
    rides: {
      ride_excitement_ave_sum: {
        key: BRANCH + ".ride_excitement_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_excitement_ave_sum", 0)
        )
      },
      ride_intensity_ave_sum: {
        key: BRANCH + ".ride_intensity_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_intensity_ave_sum", 0)
        )
      },
      ride_nausea_ave_sum: {
        key: BRANCH + ".ride_nausea_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_nausea_ave_sum", 0)
        )
      },
      ride_value_ave_sum: {
        key: BRANCH + ".ride_value_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_value_ave_sum", 0)
        )
      },
      ride_price_ave_sum: {
        key: BRANCH + ".ride_price_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_price_ave_sum", 0)
        )
      },
      ride_admission_ave_sum: {
        key: BRANCH + ".ride_admission_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_admission_ave_sum", 0)
        )
      },
      ride_age_ave_sum: {
        key: BRANCH + ".ride_age_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_age_ave_sum", 0)
        )
      },
      ride_downtime_ave_sum: {
        key: BRANCH + ".ride_downtime_ave_sum",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".ride_downtime_ave_sum", 0)
        )
      }
    },
    guest: {
      guest_weight_ave_sum: {
        key: BRANCH + ".guest_weight_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_wealth_ave_sum: {
        key: BRANCH + ".guest_wealth_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_happiness_ave_sum: {
        key: BRANCH + ".guest_happiness_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_energy_ave_sum: {
        key: BRANCH + ".guest_enery_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_nausea_ave_sum: {
        key: BRANCH + ".guest_nausea_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_hunger_ave_sum: {
        key: BRANCH + ".guest_hunger_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_thirst_ave_sum: {
        key: BRANCH + ".guest_thirst_ave_sum",
        temporary: true,
        store: store<number>(0)
      },
      guest_toilet_ave_sum: {
        key: BRANCH + ".guest_toilet_ave_sum",
        temporary: true,
        store: store<number>(0)
      }
    },
    finance: {
      income_player_action: {
        key: BRANCH + ".income_player_action",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".income_player_action", 0)
        )
      },
      income_park: {
        key: BRANCH + ".income_park",
        temporary: true,
        store: store<number>(0)
      },
      expenditure_player_action: {
        key: BRANCH + ".expenditure_player_action",
        store: store<number>(
          context.getParkStorage().get(BRANCH + ".expenditure_player_action", 0)
        )
      },
      expenditure_network: {
        key: BRANCH + ".expenditure_network",
        temporary: true,
        store: store<number>(0)
      }
    }
  }
}

/**
 * Base data object for access to all data to be displayed.
 *
 * This is used to store data that is displayed on the dashboard.
 * Accessed by the UI to display data.
 * @see BranchData
 */
const baseData: BaseData = {
  global: {
    update_frequency: twoway(
      store<number>(context.sharedStorage.get(GOBAL + ".update_frequency", 10))
    ).twoway
  },
  local: {
    player: {
      game_time_real: {
        key: LOCAL + ".game_time_real",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".game_time_real", 0)
        )
      },
      game_time_fake: {
        key: LOCAL + ".game_time_fake",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".game_time_fake", 0)
        )
      },
      action_track_design: {
        key: LOCAL + ".action_track_design",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_track_design", 0)
        )
      },
      action_stall_and_facility_placement: {
        key: LOCAL + ".action_stall_and_facility_placement",
        store: store<number>(
          context
            .getParkStorage()
            .get(LOCAL + ".action_stall_and_facility_placement", 0)
        )
      },
      action_footpath_placement: {
        key: LOCAL + ".action_footpath_placement",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_footpath_placement", 0)
        )
      },
      action_scenery_placement: {
        key: LOCAL + ".action_scenery_placement",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_scenery_placement", 0)
        )
      },
      action_landscaping: {
        key: LOCAL + ".action_landscaping",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_landscaping", 0)
        )
      },
      action_staff: {
        key: LOCAL + ".action_staff",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_staff", 0)
        )
      },
      action_relocate_peep: {
        key: LOCAL + ".action_relocate_peep",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_relocate_peep", 0)
        )
      },
      action_pop_balloon: {
        key: LOCAL + ".action_pop_balloon",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_pop_balloon", 0)
        )
      },
      action_set_cheats: {
        key: LOCAL + ".action_set_cheats",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_set_cheats", 0)
        )
      },
      action_server_join: {
        key: LOCAL + ".action_server_join",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_server_join", 0)
        )
      },
      action_server_chat: {
        key: LOCAL + ".action_server_chat",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".action_server_chat", 0)
        )
      }
    },
    park_and_scenario: {
      park_value: {
        key: LOCAL + ".park_value",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".park_value", 0)
        )
      },
      park_size: {
        key: LOCAL + ".park_size",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".park_size", 0)
        )
      },
      park_rating: {
        key: LOCAL + ".park_rating",
        temporary: true,
        store: store<number>(park.rating)
      },
      /**
       * Average stores are computed from two branch stores.
       * Whenever one of the parent stores dispaches an update, the child store
       * recomputes itself.
       */
      park_rating_ave: {
        key: LOCAL + ".park_rating_ave",
        store: compute(
          branchData.local.park_and_scenario.park_rating_ave.store,
          branchData.local.park_and_scenario.park_rating_ave_sample_count.store,
          (sum, count) => {
            return parseFloat((sum / count).toFixed(2))
          }
        )
      },
      park_rating_year_ave: {
        key: LOCAL + ".park_rating_year_ave",
        store: compute(
          branchData.local.park_and_scenario.park_rating_year_ave.store,
          branchData.local.park_and_scenario.park_rating_year_ave_sample_count
            .store,
          (sum, count) => {
            return parseFloat((sum / count).toFixed(2))
          }
        )
      },
      park_rating_month_ave: {
        key: LOCAL + ".park_rating_month_ave",
        store: compute(
          branchData.local.park_and_scenario.park_rating_month_ave.store,
          branchData.local.park_and_scenario.park_rating_month_ave_sample_count
            .store,
          (sum, count) => {
            return parseFloat((sum / count).toFixed(2))
          }
        )
      },

      entity_count_total: {
        key: LOCAL + ".entity_count_total",
        temporary: true,
        store: store<number>(map.numEntities)
      },
      entity_count_guest: {
        key: LOCAL + ".entity_count_guest",
        temporary: true,
        store: store<number>(map.getAllEntities("guest").length)
      },
      entity_count_staff: {
        key: LOCAL + ".entity_count_staff",
        temporary: true,
        store: store<number>(map.getAllEntities("staff").length)
      },
      entity_count_balloon: {
        key: LOCAL + ".entity_count_balloon",
        temporary: true,
        store: store<number>(map.getAllEntities("balloon").length)
      },
      entity_count_duck: {
        key: LOCAL + ".entity_count_duck",
        temporary: true,
        store: store<number>(map.getAllEntities("duck").length)
      },
      entity_count_litter: {
        key: LOCAL + ".entity_count_litter",
        temporary: true,
        store: store<number>(map.getAllEntities("litter").length)
      },

      reseach_invented_items: {
        key: LOCAL + ".research_invented_items",
        temporary: true,
        store: store<number>(park.research.inventedItems.length)
      },
      reseach_uninvented_items: {
        key: LOCAL + ".reseach_uninvented_items",
        temporary: true,
        store: store<number>(park.research.uninventedItems.length)
      }
    },
    stalls_and_facilities: {
      stalls_and_facilities_count_total: {
        key: LOCAL + ".stalls_and_facilities_count_total",
        temporary: true,
        store: store<number>(0)
      },
      stalls_count_total: {
        key: LOCAL + ".stalls_count_total",
        temporary: true,
        store: store<number>(0)
      },
      facilities_count_total: {
        key: LOCAL + ".facilities_count_total",
        temporary: true,
        store: store<number>(0)
      }
    },
    rides: {
      ride_count_total: {
        key: LOCAL + ".ride_count_total",
        temporary: true,
        store: store<number>(
          map.rides.filter((ride) => ride.classification === "ride").length
        )
      },
      ride_count_flat: {
        key: LOCAL + ".ride_count_flat",
        temporary: true,
        store: store<number>(0)
      },
      ride_count_tracked: {
        key: LOCAL + ".ride_count_tracked",
        temporary: true,
        store: store<number>(0)
      },

      crash_count_total: {
        key: LOCAL + ".crash_count_total",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".crash_count_total", 0)
        )
      },
      crash_count_into_vehicle: {
        key: LOCAL + ".crash_count_into_vehicle",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".crash_count_into_vehicle", 0)
        )
      },
      crash_count_into_land: {
        key: LOCAL + ".crash_count_into_land",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".crash_count_into_land", 0)
        )
      },
      crash_count_into_water: {
        key: LOCAL + ".crash_count_into_water",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".crash_count_into_water", 0)
        )
      },

      ride_excitement_ave: {
        key: LOCAL + ".ride_excitement_ave",
        store: compute(
          branchData.local.rides.ride_excitement_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.rides.ride_excitement_ave_sum.store.get() /
                map.rides.filter((ride) => ride.classification === "ride")
                  .length
              ).toFixed(2)
            )
          }
        )
      },
      ride_intensity_ave: {
        key: LOCAL + ".ride_intensity_ave",
        store: compute(
          branchData.local.rides.ride_intensity_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.rides.ride_intensity_ave_sum.store.get() /
                map.rides.filter((ride) => ride.classification === "ride")
                  .length
              ).toFixed(2)
            )
          }
        )
      },
      ride_nausea_ave: {
        key: LOCAL + ".ride_nausea_ave",
        store: compute(branchData.local.rides.ride_nausea_ave_sum.store, () => {
          return parseFloat(
            (
              branchData.local.rides.ride_nausea_ave_sum.store.get() /
              map.rides.filter((ride) => ride.classification === "ride").length
            ).toFixed(2)
          )
        })
      },
      ride_value_ave: {
        key: LOCAL + ".ride_value_ave",
        store: compute(branchData.local.rides.ride_value_ave_sum.store, () => {
          return parseFloat(
            (
              branchData.local.rides.ride_value_ave_sum.store.get() /
              map.rides.filter((ride) => ride.classification === "ride").length
            ).toFixed(2)
          )
        })
      },
      ride_price_ave: {
        key: LOCAL + ".ride_price_ave",
        store: compute(branchData.local.rides.ride_price_ave_sum.store, () => {
          return parseFloat(
            (
              branchData.local.rides.ride_price_ave_sum.store.get() /
              map.rides.filter((ride) => ride.classification === "ride").length
            ).toFixed(2)
          )
        })
      },
      ride_admission_ave: {
        key: LOCAL + ".ride_admission_ave",
        store: compute(
          branchData.local.rides.ride_admission_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.rides.ride_admission_ave_sum.store.get() /
                map.rides.filter((ride) => ride.classification === "ride")
                  .length
              ).toFixed(0)
            )
          }
        )
      },
      ride_age_ave: {
        key: LOCAL + ".ride_age_ave",
        store: compute(branchData.local.rides.ride_age_ave_sum.store, () => {
          return parseFloat(
            (
              branchData.local.rides.ride_age_ave_sum.store.get() /
              map.rides.filter((ride) => ride.classification === "ride").length
            ).toFixed(2)
          )
        })
      },
      ride_downtime_ave: {
        key: LOCAL + ".ride_downtime_ave",
        store: compute(
          branchData.local.rides.ride_downtime_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.rides.ride_downtime_ave_sum.store.get() /
                map.rides.filter((ride) => ride.classification === "ride")
                  .length
              ).toFixed(2)
            )
          }
        )
      }
    },
    guest: {
      guest_generation_total: {
        key: LOCAL + ".guest_generation_total",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".guest_generation_total", 0)
        )
      },
      guest_admission_total: {
        key: LOCAL + ".guest_admission_total",
        temporary: true,
        store: store<number>(park.totalAdmissions)
      },
      guest_count_current: {
        key: LOCAL + ".guest_count_current",
        temporary: true,
        store: store<number>(map.getAllEntities("guest").length)
      },
      guest_soft_cap: {
        key: LOCAL + ".guest_soft_cap",
        temporary: true,
        store: store<number>(park.suggestedGuestMaximum)
      },
      guest_weight_ave: {
        key: LOCAL + ".guest_weight_ave",
        store: compute(
          branchData.local.guest.guest_weight_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_weight_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_wealth_ave: {
        key: LOCAL + ".guest_wealth_ave",
        store: compute(
          branchData.local.guest.guest_wealth_ave_sum.store,
          () => {
            // console.log("Guest wealth sample count 2: " + map.getAllEntities("guest").length);
            return parseFloat(
              (
                branchData.local.guest.guest_wealth_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_happiness_ave: {
        key: LOCAL + ".guest_happiness_ave",
        store: compute(
          branchData.local.guest.guest_happiness_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_happiness_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_energy_ave: {
        key: LOCAL + ".guest_energy_ave",
        store: compute(
          branchData.local.guest.guest_energy_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_energy_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_nausea_ave: {
        key: LOCAL + ".guest_nausea_ave",
        store: compute(
          branchData.local.guest.guest_nausea_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_nausea_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_hunger_ave: {
        key: LOCAL + ".guest_hunger_ave",
        store: compute(
          branchData.local.guest.guest_hunger_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_hunger_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_thirst_ave: {
        key: LOCAL + ".guest_thirst_ave",
        store: compute(
          branchData.local.guest.guest_thirst_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_thirst_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      },
      guest_toilet_ave: {
        key: LOCAL + ".guest_toilet_ave",
        store: compute(
          branchData.local.guest.guest_toilet_ave_sum.store,
          () => {
            return parseFloat(
              (
                branchData.local.guest.guest_toilet_ave_sum.store.get() /
                map.getAllEntities("guest").length
              ).toFixed(2)
            )
          }
        )
      }
    },
    finance: {
      total_income: {
        key: LOCAL + ".total_income",
        temporary: true,
        store: compute(
          branchData.local.finance.income_player_action.store,
          branchData.local.finance.income_park.store,
          (player, park) => {
            return player + park
          }
        )
      },
      /**
       * This value is always negative.
       */
      total_expenditure: {
        key: LOCAL + ".total_expenditure",
        temporary: true,
        store: compute(
          branchData.local.finance.expenditure_player_action.store,
          branchData.local.finance.expenditure_network.store,
          (player, network) => {
            return player + network
          }
        )
      },
      company_value: {
        key: LOCAL + ".company_value",
        temporary: true,
        store: store<number>(park.companyValue)
      }
    },
    options: {
      update_status: {
        key: LOCAL + ".update_paused",
        store: store<number>(
          context.getParkStorage().get(LOCAL + ".update_paused", 0)
        )
      },
      countdown_progress: {
        key: LOCAL + ".countdown_progress",
        temporary: true,
        store: store<number>(0)
      },
      display_mode: {
        key: LOCAL + ".display_mode",
        store: store<number>(
          context
            .getParkStorage()
            .get(LOCAL + ".display_mode", Options.DisplayMode.VALUE)
        )
      }
    }
  }
}

function eraseTempData(): void {
  for (let key in baseData.local) {
    const dataSet = baseData.local[key as DataType] as DataSet<number, any>
    for (let subKey in dataSet) {
      const entry = dataSet[subKey as keyof typeof dataSet]
      if (
        entry.temporary &&
        context.getParkStorage().has(dataSet[subKey].key)
      ) {
        context.getParkStorage().set(dataSet[subKey].key, undefined)
      }
    }
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
      Logger.debug("New scenario. Resetting data...")
      eraseTempData()
      for (let key in baseData.local) {
        const dataSet = baseData.local[key as DataType] as DataSet<number, any>
        for (let subKey in dataSet) {
          if (!dataSet[subKey].temporary) {
            dataSet[subKey].store.set(
              context.getParkStorage().get(dataSet[subKey].key, 0)
            )
          } else {
            dataSet[subKey].store.set(0)
          }
        }
      }
      for (let key in branchData.local) {
        const dataSet = branchData.local[
          key as keyof typeof branchData.local
        ] as DataSet<number, any>
        for (let subKey in dataSet) {
          if (!dataSet[subKey].temporary) {
            dataSet[subKey].store.set(
              context.getParkStorage().get(dataSet[subKey].key, 0)
            )
          } else {
            dataSet[subKey].store.set(0)
          }
        }
      }
    }
  })
}

function deleteAll(): void {
  for (let key in baseData.local) {
    if ((key as DataType) === "options") continue
    const dataSet = baseData.local[key as DataType] as DataSet<number, any>
    for (let subKey in dataSet) {
      if (!dataSet[subKey].temporary) {
        context.getParkStorage().set(dataSet[subKey].key, undefined)
      }
      dataSet[subKey].store.set(dataSet[subKey].default || 0)
    }
  }

  for (let key in branchData.local) {
    const dataSet = branchData.local[
      key as keyof typeof branchData.local
    ] as DataSet<number, any>
    for (let subKey in dataSet) {
      if (!dataSet[subKey].temporary) {
        context.getParkStorage().set(dataSet[subKey].key, undefined)
      }
      dataSet[subKey].store.set(dataSet[subKey].default || 0)
    }
  }
}

/**
 * Initialize data.
 * @returns {void}
 */
function initData(): void {
  /**
   * Iterate throught every data unit to automatically write data to
   * local file whenever the store receives an update.
   *
   * Performance impact is unknown. Since the values are updated according
   * to the update frequency set by the user, the impact should be controllable.
   */

  baseData.global.update_frequency.subscribe((value) => {
    context.sharedStorage.set(GOBAL + ".update_frequency", value)
  })

  for (let key in baseData.local) {
    const dataSet = baseData.local[key as DataType] as DataSet<number, any>
    for (let subKey in dataSet) {
      if (!dataSet[subKey].temporary) {
        dataSet[subKey].store.subscribe((value: any) =>
          context.getParkStorage().set(dataSet[subKey].key, value)
        )
      }
    }
  }

  for (let key in branchData.local) {
    const dataSet = branchData.local[
      key as keyof typeof branchData.local
    ] as DataSet<number, any>
    for (let subKey in dataSet) {
      if (!dataSet[subKey].temporary) {
        dataSet[subKey].store.subscribe((value: any) =>
          context.getParkStorage().set(dataSet[subKey].key, value)
        )
      }
    }
  }

  onMapChanged()
}

const interval = IntervalManager.init({
  update_frequency: baseData.global.update_frequency,
  countdown_progress: baseData.local.options.countdown_progress.store
})

export {
  type DataEntry,
  type DataSet,
  type DataGroup,
  type BranchDataGroup,
  type BaseData,
  type BranchData,
  baseData,
  branchData,
  initData,
  deleteAll,
  interval
}

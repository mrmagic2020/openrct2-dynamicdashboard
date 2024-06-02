type DataClass = "base" | "branch"

type DataScope = "global" | "local"

type DataType =
  | "player"
  | "park_and_scenario"
  | "stalls_and_facilities"
  | "rides"
  | "guest"
  | "finance"
  | "options"

type BranchDataType =
  | "park_and_scenario"
  | "rides"
  | "guest"
  | "finance"
  | "utils"

type PlayerDataType =
  | "game_time_real"
  | "game_time_fake"
  | "action_track_design"
  | "action_stall_and_facility_placement"
  | "action_footpath_placement"
  | "action_scenery_placement"
  | "action_landscaping"
  | "action_staff"
  | "action_relocate_peep"
  | "action_pop_balloon"
  | "action_set_cheats"
  | "action_server_join"
  | "action_server_chat"

type ParkAndScenarioDataType =
  | "park_value"
  | "park_size"
  | "park_rating"
  | "park_rating_ave"
  | "park_rating_year_ave"
  | "park_rating_month_ave"
  | "objective_status"
  | "objective_days_left"
  | "entity_count_total"
  | "entity_count_guest"
  | "entity_count_staff"
  | "entity_count_balloon"
  | "entity_count_duck"
  | "entity_count_litter"
  | "reseach_invented_items"
  | "reseach_uninvented_items"

type ParkAndScenarioBranchDataType =
  | "park_rating_ave_sample_count"
  | "park_rating_ave"
  | "park_rating_year_ave_sample_count"
  | "park_rating_year_ave"
  | "park_rating_month_ave_sample_count"
  | "park_rating_month_ave"

type StallsAndFacilitiesDataType =
  | "stalls_and_facilities_count_total"
  | "stalls_count_total"
  | "facilities_count_total"

type RidesDataType =
  | "ride_count_total"
  | "ride_count_flat"
  | "ride_count_tracked"
  | "crash_count_total"
  | "crash_count_into_vehicle"
  | "crash_count_into_land"
  | "crash_count_into_water"
  | "ride_excitement_ave"
  | "ride_intensity_ave"
  | "ride_nausea_ave"
  | "ride_value_ave"
  | "ride_price_ave"
  | "ride_admission_ave"
  | "ride_age_ave"
  | "ride_downtime_ave"

type RidesBranchDataType =
  | "ride_excitement_ave_sum"
  | "ride_intensity_ave_sum"
  | "ride_nausea_ave_sum"
  | "ride_value_ave_sum"
  | "ride_price_ave_sum"
  | "ride_admission_ave_sum"
  | "ride_age_ave_sum"
  | "ride_downtime_ave_sum"

type GuestDataType =
  | "guest_generation_total"
  | "guest_admission_total"
  | "guest_count_current"
  | "guest_soft_cap"
  | "guest_weight_ave"
  | "guest_wealth_ave"
  | "guest_happiness_ave"
  | "guest_energy_ave"
  | "guest_nausea_ave"
  | "guest_hunger_ave"
  | "guest_thirst_ave"
  | "guest_toilet_ave"

type GuestBranchDataType =
  | "guest_weight_ave_sum"
  | "guest_wealth_ave_sum"
  | "guest_happiness_ave_sum"
  | "guest_energy_ave_sum"
  | "guest_nausea_ave_sum"
  | "guest_hunger_ave_sum"
  | "guest_thirst_ave_sum"
  | "guest_toilet_ave_sum"

type FinanceDataType =
  | "total_income"
  | "total_expenditure"
  | "company_value"
  | "company_value_record"

type FinanceBranchDataType =
  | "income_player_action"
  | "income_park"
  | "expenditure_player_action"
  | "expenditure_network"

type OptionsDataType = "update_status" | "countdown_progress" | "display_mode"

type UtilsBranchDataType = "last_updated_month" | "last_updated_year"

type DataKey =
  | PlayerDataType
  | ParkAndScenarioDataType
  | StallsAndFacilitiesDataType
  | RidesDataType
  | GuestDataType
  | FinanceDataType
  | OptionsDataType
  | ParkAndScenarioBranchDataType
  | RidesBranchDataType
  | GuestBranchDataType
  | FinanceBranchDataType
  | UtilsBranchDataType

type RequestKey =
  | `base.player.${PlayerDataType}`
  | `base.park_and_scenario.${ParkAndScenarioDataType}`
  | `base.stalls_and_facilities.${StallsAndFacilitiesDataType}`
  | `base.rides.${RidesDataType}`
  | `base.guest.${GuestDataType}`
  | `base.finance.${FinanceDataType}`
  | `base.options.${OptionsDataType}`
  | `branch.park_and_scenario.${ParkAndScenarioBranchDataType}`
  | `branch.rides.${RidesBranchDataType}`
  | `branch.guest.${GuestBranchDataType}`
  | `branch.finance.${FinanceBranchDataType}`
  | `branch.utils|${UtilsBranchDataType}`

interface RequestDataInfo {
  class: DataClass
  scope: DataScope
  type: DataType
  key: DataKey
}

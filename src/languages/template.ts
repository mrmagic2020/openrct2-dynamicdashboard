export interface Language {
  ui: {
    toolbox: {
      title: string
      language_selection_label: string
      language_item: string
      update_ratio_spinner: string
      update_ratio_spinner_unit: string
    }
    main: {
      title: string
      groupbox: {
        player: {
          title: string
          action_statistics: string
        }
        park_and_scenario: {
          title: string
          park_rating: string
          entity_count: string
          research: string
        }
        stalls_and_facilities: {
          title: string
          prices: string
        }
        rides: {
          title: string
          crashes: string
        }
        guest: {
          title: string
        }
      }
      label: {
        player_name: string
        player_id: string
        game_time_real: string
        game_time_fake: string

        action_track_design: string
        action_stall_and_facility_placement: string
        action_footpath_placement: string
        action_scenery_placement: string
        action_landscaping: string
        action_staff: string
        action_relocate_peep: string
        action_pop_balloon: string
        action_set_cheats: string
        action_server_join: string
        action_server_chat: string

        park_value: string
        park_size: string
        park_rating_current: string
        park_rating_ave: string
        park_rating_year_ave: string
        park_rating_month_ave: string

        entity_count_total: string
        entity_count_guest: string
        entity_count_staff: string
        entity_count_balloon: string
        entity_count_duck: string
        entity_count_litter: string

        research_invented_items: string
        research_uninvented_items: string

        stalls_and_facilities_count_total: string
        stalls_count_total: string
        facilities_count_total: string

        ride_count_total: string
        ride_count_flat: string
        ride_count_tracked: string

        crash_count_total: string
        crash_count_into_vehicle: string
        crash_count_into_land: string
        crash_count_into_water: string

        ride_excitement_ave: string
        ride_intensity_ave: string
        ride_nausea_ave: string
        ride_value_ave: string
        ride_price_ave: string
        ride_admission_ave: string

        guest_generation_total: string
        guest_admission_total: string
        guest_count_current: string
        guest_soft_cap: string
        guest_weight_ave: string
        guest_wealth_ave: string
        guest_happiness_ave: string
        guest_energy_ave: string
        guest_nausea_ave: string
        guest_hunger_ave: string
        guest_thirst_ave: string
        guest_toilet_ave: string
      }
      tooltip: {
        entity_count_total_limitation: string
      }
    }
  }
}

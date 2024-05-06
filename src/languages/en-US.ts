import { Language } from "./template"

export const en_US: Language = {
  ui: {
    toolbox: {
      title: "Dynamic Dashboard",
      language_selection_label: "Select your preferred language:",
      language_item: "English (US)",
      update_ratio_spinner: "Update raio (requires game restart):",
      update_ratio_spinner_unit: "seconds"
    },
    main: {
      title: "Dynamic Dashboard",
      groupbox: {
        player: {
          title: "{PALEGOLD}Player",
          action_statistics: "{PALEGOLD}Action Statistics"
        },
        park_and_scenario: {
          title: "{PALEGOLD}Park & Scenario",
          park_rating: "{PALEGOLD}Park Rating",
          entity_count: "{PALEGOLD}Entity Count",
          research: "{PALEGOLD}Research"
        },
        rides: {
          title: "{PALEGOLD}Rides",
          crashes: "{PALEGOLD}Crashes"
        },
        guest: {
          title: "{PALEGOLD}Guest"
        }
      },
      label: {
        player_name: "Name: {PALESILVER}",
        player_id: "ID: {PALESILVER}",
        game_time_real: "Game time (real-life): {PALESILVER}<NUMBER> minutes",
        game_time_fake: "Game time (in-game): {PALESILVER}<NUMBER> days",

        action_track_design: "Track design: {PALESILVER}",
        action_stall_and_facility_placement:
          "Stall / facility placement: {PALESILVER}",
        action_footpath_placement: "Footpath placement: {PALESILVER}",
        action_scenery_placement: "Scenery placement: {PALESILVER}",
        action_landscaping: "Landscaping: {PALESILVER}",
        action_staff: "Staff action: {PALESILVER}",
        action_relocate_peep: "Peep relocation: {PALESILVER}",
        action_pop_balloon: "Pop balloon: {PALESILVER}",
        action_set_cheats: "Set cheats: {PALESILVER}",
        action_server_join: "Join server: {PALESILVER}",
        action_server_chat: "Chat: {PALESILVER}",

        park_value: "Park value: {PALESILVER}<NUMBER&UNIT>",
        park_size: "Park size: {PALESILVER}<NUMBER> tiles",
        park_rating_current: "Current: {PALESILVER}",
        park_rating_ave: "Average (all time): {PALESILVER}",
        park_rating_year_ave: "Average (year): {PALESILVER}",
        park_rating_month_ave: "Average (month): {PALESILVER}",

        entity_count_total: "Total: {PALESILVER}",
        entity_count_guest: "Guest: {PALESILVER}",
        entity_count_staff: "Staff: {PALESILVER}",
        entity_count_balloon: "Balloon: {PALESILVER}",
        entity_count_duck: "Duck: {PALESILVER}",
        entity_count_litter: "Litter: {PALESILVER}",

        research_invented_items: "Invented items: {PALESILVER}",
        research_uninvented_items: "Uninvented items: {PALESILVER}",

        ride_count_total: "Total: {PALESILVER}",
        ride_count_flat: "Flat: {PALESILVER}",
        ride_count_tracked: "Tracked: {PALESILVER}",

        crash_count_total: "Total: {PALESILVER}",
        crash_count_into_vehicle: "Into vehicle: {PALESILVER}",
        crash_count_into_land: "Into land: {PALESILVER}",
        crash_count_into_water: "Into water: {PALESILVER}",

        ride_excitement_ave: "Average excitement: {PALESILVER}",
        ride_intensity_ave: "Average intensity: {PALESILVER}",
        ride_nausea_ave: "Average nausea: {PALESILVER}",
        ride_value_ave: "Average value: {PALESILVER}",
        ride_price_ave: "Average price: {PALESILVER}",
        ride_admission_ave: "Average admission: {PALESILVER}",

        guest_generation_total: "Total Guest Generation: {PALESILVER}",
        guest_admission_total: "Total Guest Admission: {PALESILVER}",
        guest_count_current: "Current Guest Count: {PALESILVER}",
        guest_soft_cap: "Soft Cap: {PALESILVER}",
        guest_weight_ave: "Average Weight: {PALESILVER}",
        guest_wealth_ave: "Average Wealth: {PALESILVER}<NUMBER&UNIT>",
        guest_happiness_ave: "Average Happiness: {PALESILVER}",
        guest_energy_ave: "Average Energy: {PALESILVER}",
        guest_nausea_ave: "Average Nausea: {PALESILVER}",
        guest_hunger_ave: "Average Hunger: {PALESILVER}",
        guest_thirst_ave: "Average Thirst: {PALESILVER}",
        guest_toilet_ave: "Average Toilet: {PALESILVER}"
      },
      tooltip: {
        entity_count_total_limitation:
          "An unsigned 16-bit integer has a range limit of 0~65535. If the entity count goes beyond that, the number ceases to change."
      }
    }
  }
}

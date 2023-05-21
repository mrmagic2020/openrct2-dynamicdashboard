import {
  Language
} from "./template";

export const en_US : Language = {
  ui: {
    toolbox: {
      title: "Dynamic Dashboard",
      language_selection_label: "Select your preferred language:",
      language_item: "English (US)"
    },
    main: {
      title: "Dynamic Dashboard",
      groupbox: {
        player: {
          title: "{PALEGOLD}Player",
          action_statistics: "{PALEGOLD}Action Statistics"
        }
      },
      label: {
        player_name: "Name: {PALESILVER}",
        player_id: "ID: {PALESILVER}",
        game_time_real: "Game time (real-life): {PALESILVER}<NUMBER> minutes",
        game_time_fake: "Game time (in-game): {PALESILVER}<NUMBER> days",
        
        action_track_design: "Track design: {PALESILVER}",
        action_stall_and_facility_placement: "Stall / facility placement: {PALESILVER}",
        action_footpath_placement: "Footpath placement: {PALESILVER}",
        action_scenery_placement: "Scenery placement: {PALESILVER}",
        action_landscaping: "Landscaping: {PALESILVER}",
        action_staff: "Staff action: {PALESILVER}",
        action_relocate_peep: "Peep relocation: {PALESILVER}",
        action_pop_balloon: "Pop balloon: {PALESILVER}",
        action_set_cheats: "Set cheats: {PALESILVER}",
        action_server_join: "Join server: {PALESILVER}",
        action_server_chat: "Chat: {PALESILVER}"
      }
    }
  }
}

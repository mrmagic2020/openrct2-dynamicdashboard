export interface Language {
  ui: {
    toolbox: {
      title: string;
      language_selection_label: string;
      language_item: string;
    };
    main: {
      title: string;
      groupbox: {
        player: {
          title: string;
          action_statistics: string;
        };
      };
      label: {
        player_name: string;
        player_id: string;
        game_time_real: string;
        game_time_fake: string;

        action_track_design: string;
        action_stall_and_facility_placement: string;
        action_footpath_placement: string;
        action_scenery_placement: string;
        action_landscaping: string;
        action_staff: string;
        action_relocate_peep: string;
        action_pop_balloon: string;
        action_set_cheats: string;
        action_server_join: string;
        action_server_chat: string;
      }
    };
  };
}

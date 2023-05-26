export interface Language {
  ui: {
    toolbox: {
      title: string;
      language_selection_label: string;
      language_item: string;
      update_ratio_spinner: string;
      update_ratio_spinner_unit: string;
    };
    main: {
      title: string;
      groupbox: {
        player: {
          title: string;
          action_statistics: string;
        };
        park_and_scenario: {
          title: string;
          park_rating: string;
          entity_count: string;
          research: string;
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

        park_value: string;
        park_size: string;
        park_rating_current: string;
        park_rating_ave: string;
        park_rating_year_ave: string;
        park_rating_month_ave: string;

        entity_count_total: string;
        entity_count_guest: string;
        entity_count_staff: string;
        entity_count_balloon: string;
        entity_count_duck: string;
        entity_count_litter: string;

        research_invented_items: string;
        research_uninvented_items: string;
      };
      tooltip: {
        entity_count_total_limitation: string;
      };
    };
  };
}

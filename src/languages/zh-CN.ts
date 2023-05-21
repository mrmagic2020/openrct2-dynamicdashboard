import { Language } from "./template";

export const zh_CN : Language = {
  ui: {
    toolbox: {
      title: "动态仪表",
      language_selection_label: "选择语言：",
      language_item: "简体中文"
    },
    main: {
      title: "动态仪表",
      groupbox: {
        player: {
          title: "{PALEGOLD}玩家",
          action_statistics: "{PALEGOLD}行为统计"
        }
      },
      label: {
        player_name: "玩家名：{PALESILVER}",
        player_id: "ID: {PALESILVER}",
        game_time_real: "游戏时间（实际时间）：{PALESILVER}<NUMBER>分钟",
        game_time_fake: "游戏时间：{PALESILVER}<NUMBER>天",
        
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

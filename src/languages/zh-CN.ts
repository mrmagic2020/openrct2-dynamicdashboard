import { Language } from "./template";

export const zh_CN : Language = {
  ui: {
    toolbox: {
      title: "动态仪表",
      language_selection_label: "选择语言：",
      language_item: "简体中文",
      update_ratio_spinner: "更新频率（需要重启游戏）",
      update_ratio_spinner_unit: "秒"
    },
    main: {
      title: "动态仪表",
      groupbox: {
        player: {
          title: "{PALEGOLD}玩家",
          action_statistics: "{PALEGOLD}行为统计"
        },
        park_and_scenario: {
          title: "{PALEGOLD}园区及地图",
          park_rating: "园区评分",
          entity_count: "实体统计"
        }
      },
      label: {
        player_name: "玩家名：{PALESILVER}",
        player_id: "ID：{PALESILVER}",
        game_time_real: "游戏时间（实际时间）：{PALESILVER}<NUMBER>分钟",
        game_time_fake: "游戏时间：{PALESILVER}<NUMBER>天",
        
        action_track_design: "过山车设计：{PALESILVER}",
        action_stall_and_facility_placement: "商店/公共设施设计：{PALESILVER}",
        action_footpath_placement: "道路设计：{PALESILVER}",
        action_scenery_placement: "景物设计：{PALESILVER}",
        action_landscaping: "地形设计：{PALESILVER}",
        action_staff: "员工管理：{PALESILVER}",
        action_relocate_peep: "人员迁移：{PALESILVER}",
        action_pop_balloon: "戳气球：{PALESILVER}",
        action_set_cheats: "作弊设置：{PALESILVER}",
        action_server_join: "进入服务器：{PALESILVER}",
        action_server_chat: "聊天消息：{PALESILVER}",

        park_value: "园区价值：{PALESILVER}",
        park_size: "园区面积：{PALESILVER}<NUMBER> tiles",
        park_rating_current: "当前：{PALESILVER}",
        park_rating_ave: "平均值：{PALESILVER}",
        park_rating_year_ave: "平均值（当年）：{PALESILVER}",
        park_rating_month_ave: "平均值（当月）：{PALESILVER}",

        entity_count_total: "总数：{PALESILVER}",
        entity_count_guest: "游客：{PALESILVER}",
        entity_count_staff: "员工：{PALESILVER}",
        entity_count_balloon: "气球：{PALESILVER}",
        entity_count_duck: "鸭子：{PALESILVER}",
        entity_count_litter: "垃圾：{PALESILVER}"
      },
      tooltip: {
        entity_count_total_limitation: "16位无符号整数的取值范围限制是0~65535。如果实体数量超过这个值，这个数字就会停止变化。"
      }
    }
  }
}

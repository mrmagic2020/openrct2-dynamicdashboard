import { Language } from "./template"

export const zh_CN: Language = {
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
          park_rating: "{PALEGOLD}园区评分",
          entity_count: "{PALEGOLD}实体统计",
          research: "{PALEGOLD}调查数据"
        },
        rides: {
          title: "{PALEGOLD}游乐设施",
          crashes: "{PALEGOLD}事故统计"
        },
        guest: {
          title: "{PALEGOLD}游客"
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

        park_value: "园区价值：{PALESILVER}<NUMBER&UNIT>",
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
        entity_count_litter: "垃圾：{PALESILVER}",

        research_invented_items: "已发明: {PALESILVER}",
        research_uninvented_items: "未发明: {PALESILVER}",

        ride_count_total: "总数：{PALESILVER}",
        ride_count_flat: "平面：{PALESILVER}",
        ride_count_tracked: "有轨：{PALESILVER}",

        crash_count_total: "总数：{PALESILVER}",
        crash_count_into_vehicle: "撞车：{PALESILVER}",
        crash_count_into_land: "撞地：{PALESILVER}",
        crash_count_into_water: "撞水：{PALESILVER}",

        ride_excitement_ave: "兴奋度平均值：{PALESILVER}",
        ride_intensity_ave: "强度平均值：{PALESILVER}",
        ride_nausea_ave: "眩晕度平均值：{PALESILVER}",
        ride_value_ave: "价值平均值：{PALESILVER}",
        ride_price_ave: "价格平均值：{PALESILVER}",
        ride_admission_ave: "总顾客平均值：{PALESILVER}",

        guest_generation_total: "总顾客生成：{PALESILVER}",
        guest_admission_total: "总顾客入园：{PALESILVER}",
        guest_count_current: "当前顾客：{PALESILVER}",
        guest_soft_cap: "软上限：{PALESILVER}",
        guest_weight_ave: "平均体重：{PALESILVER}",
        guest_wealth_ave: "平均财富：{PALESILVER}<NUMBER&UNIT>",
        guest_happiness_ave: "平均快乐度：{PALESILVER}",
        guest_energy_ave: "平均精力：{PALESILVER}",
        guest_nausea_ave: "平均眩晕度：{PALESILVER}",
        guest_hunger_ave: "平均饥饿度：{PALESILVER}",
        guest_thirst_ave: "平均口渴度：{PALESILVER}",
        guest_toilet_ave: "平均厕所需求：{PALESILVER}"
      },
      tooltip: {
        entity_count_total_limitation:
          "16位无符号整数的取值范围限制是0~65535。如果实体数量超过这个值，这个数字就会停止变化。"
      }
    }
  }
}

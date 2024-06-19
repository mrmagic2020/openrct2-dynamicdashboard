import {
  Colour,
  WindowParams,
  WindowTemplate,
  button,
  compute,
  groupbox,
  horizontal,
  label,
  vertical,
  window
} from "openrct2-flexui"
import { language } from "../languages/lang"
import { baseData } from "../data/main"
import { interval } from "../data/main"
import Sprites from "./generic/sprites"
import Data from "../data/index"
import { progressBar } from "./generic/widgets/progress_bar"
import { GuestData } from "../data/guest"
import {
  Indicators,
  toggleManualIndicatorLit
} from "./generic/widgets/indicators"
import DynamicDashboard from "../common/plugin"
import MathUtils from "../utils/math_utils"
import * as Advanced from "./advanced/advanced"
import GraphWindow from "./generic/windows/graph"
import StatisticalAnalysis from "../utils/statistical_analysis"

/**
 * Whether the window is open.
 */
let isOpen: boolean = false
let windowTemplate: WindowTemplate

function getWindowParams(): WindowParams {
  return {
    title: language.ui.main.title,
    width: 800,
    // Accomodate more statistics when playing in servers.
    height: network.mode === "none" ? 500 : 570,
    position: "center",
    colours: [
      baseData.global.colour_scheme.primary.store.get(),
      baseData.global.colour_scheme.secondary.store.get()
    ],
    content: [
      horizontal([
        vertical([
          // Player
          groupbox({
            text: language.ui.main.groupbox.player.title,
            content: [
              label({
                text: context.formatString(
                  language.ui.main.label.player_name,
                  network.currentPlayer.name
                ),
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: context.formatString(
                  language.ui.main.label.player_id,
                  network.currentPlayer.id
                ),
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: compute(
                  baseData.local.player.game_time_real.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.game_time_real,
                      value
                    )
                ),
                visibility: "visible"
              }),
              label({
                text: compute(
                  baseData.local.player.game_time_fake.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.game_time_fake,
                      value
                    )
                ),
                visibility: "visible"
              }),
              // Action Statistics
              groupbox({
                text: language.ui.main.groupbox.player.action_statistics,
                content: [
                  // Track Design
                  label({
                    text: compute(
                      baseData.local.player.action_track_design.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_track_design,
                          value
                        )
                    ),
                    tooltip: language.ui.main.tooltip.action_track_design
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_stall_and_facility_placement
                        .store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label
                            .action_stall_and_facility_placement,
                          value
                        )
                    ),
                    tooltip:
                      language.ui.main.tooltip
                        .action_stall_and_facility_placement
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_footpath_placement.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_footpath_placement,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_scenery_placement.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_scenery_placement,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_landscaping.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_landscaping,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_staff.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_staff,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_relocate_peep.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_relocate_peep,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_pop_balloon.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_pop_balloon,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_set_cheats.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_set_cheats,
                          value
                        )
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_server_join.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_server_join,
                          value
                        )
                    ),
                    visibility: network.mode === "none" ? "none" : "visible"
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_server_chat.store,
                      (value) =>
                        context.formatString(
                          language.ui.main.label.action_server_chat,
                          value
                        )
                    ),
                    visibility: network.mode === "none" ? "none" : "visible"
                  })
                ]
              })
            ]
          }),
          // Guest
          groupbox({
            text: language.ui.main.groupbox.guest.title,
            content: [
              // Guest Generation Total
              label({
                text: compute(
                  baseData.local.guest.guest_generation_total.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_generation_total,
                      value
                    )
                )
              }),
              // Guest Admission Total
              label({
                text: compute(
                  baseData.local.guest.guest_admission_total.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_admission_total,
                      value
                    )
                )
              }),
              // Current Guest Count
              label({
                text: compute(
                  baseData.local.guest.guest_count_current.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_count_current,
                      value
                    )
                )
              }),
              // Guest Soft Cap
              label({
                text: compute(
                  baseData.local.guest.guest_soft_cap.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_soft_cap,
                      value
                    )
                )
              }),
              // Guest Average Weight
              label({
                text: compute(
                  baseData.local.guest.guest_weight_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_weight_ave,
                      value * 100 // Since {COMMA2DP32} divides the value by 100
                    )
                )
              }),
              // Guest Average Wealth
              label({
                text: compute(
                  baseData.local.guest.guest_wealth_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.guest_wealth_ave,
                      value
                    )
                )
              }),
              // Guest happiness average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_happiness_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_happiness_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_happiness_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_happiness_ave.store,
                      (value) => {
                        return MathUtils.normalise(
                          value,
                          0,
                          GuestData.MAX_HAPPINESS
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_happiness_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value < GuestData.HAPINESS_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  }),
                  button({
                    text: "...",
                    width: "14px",
                    height: "14px",
                    visibility: compute(
                      baseData.global.show_advanced_statistics.store,
                      (value) => {
                        return value ? "visible" : "none"
                      }
                    ),
                    onClick: () => {
                      const statisticalAnalsysis = new StatisticalAnalysis(
                        map.getAllEntities("guest").map((guest) => {
                          return guest.happiness
                        })
                      )
                      GraphWindow.show({
                        id: "guest_happiness",
                        title: context.formatString(
                          language.ui.generic.advanced_statistics.title,
                          language.ui.main.label.guest_happiness_ave
                        ),
                        statistics: statisticalAnalsysis,
                        boxChartRange: GuestData.MAX_HAPPINESS
                      })
                    }
                  })
                ]
              }),
              // Guest energy average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_energy_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_energy_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_energy_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_energy_ave.store,
                      (value) => {
                        return MathUtils.normalise(
                          value,
                          0,
                          GuestData.MAX_ENERGY
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_energy_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value < GuestData.ENERGY_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  })
                ]
              }),
              // Guest nausea average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_nausea_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_nausea_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_nausea_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_nausea_ave.store,
                      (value) => {
                        return MathUtils.normalise(
                          value,
                          0,
                          GuestData.MAX_NAUSEA
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_nausea_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value > GuestData.NAUSEA_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  })
                ]
              }),
              // Guest hunger average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_hunger_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_hunger_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_hunger_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_hunger_ave.store,
                      (value) => {
                        return (
                          1 -
                          MathUtils.normalise(value, 0, GuestData.MAX_HUNGER)
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_hunger_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value < GuestData.HUNGER_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  })
                ]
              }),
              // Guest thirst average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_thirst_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_thirst_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_thirst_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_thirst_ave.store,
                      (value) => {
                        return (
                          1 -
                          MathUtils.normalise(value, 0, GuestData.MAX_THIRST)
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_thirst_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value < GuestData.THIRST_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  })
                ]
              }),
              // Guest toilet average
              horizontal({
                content: [
                  label({
                    text: compute(
                      baseData.local.guest.guest_toilet_ave.store,
                      baseData.local.options.display_mode.store,
                      (value, mode) => {
                        switch (mode) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label.guest_toilet_ave
                          case Data.Options.DisplayMode.VALUE:
                            return context.formatString(
                              language.ui.main.label.guest_toilet_ave,
                              value * 100
                            )
                          default:
                            return ""
                        }
                      }
                    )
                  }),
                  progressBar({
                    visibility: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        return value === Data.Options.DisplayMode.PROGRESS_BAR
                          ? "visible"
                          : "none"
                      }
                    ),
                    percentFilled: compute(
                      baseData.local.guest.guest_toilet_ave.store,
                      (value) => {
                        return MathUtils.normalise(
                          value,
                          0,
                          GuestData.MAX_TOILET
                        )
                      }
                    ),
                    background: baseData.global.colour_scheme.primary.store,
                    foreground: compute(
                      baseData.local.guest.guest_toilet_ave.store,
                      baseData.global.colour_scheme.progressbar_warning.store,
                      baseData.global.colour_scheme.progressbar_normal.store,
                      (value, colour_warning, colour_normal) => {
                        if (value > GuestData.TOILET_WARNING_THRESHOLD)
                          return colour_warning
                        return colour_normal
                      }
                    )
                  })
                ]
              })
            ]
          })
        ]),
        vertical([
          // Park & Scenario
          groupbox({
            text: language.ui.main.groupbox.park_and_scenario.title,
            content: [
              // Park Value
              label({
                text: compute(
                  baseData.local.park_and_scenario.park_value.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.park_value,
                      value
                    )
                )
              }),
              // Park Size
              label({
                text: compute(
                  baseData.local.park_and_scenario.park_size.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.park_size,
                      value
                    )
                )
              }),
              // Park Rating
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.park_rating,
                content: [
                  // Park Rating Current
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario.park_rating.store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label
                                  .park_rating_current
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label.park_rating_current,
                                  value * 100
                                )
                              default:
                                return ""
                            }
                          }
                        )
                      }),
                      progressBar({
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario.park_rating.store,
                          (value) => {
                            return MathUtils.normalise(
                              value,
                              Data.ParkAndScenarioData.MIN_PARK_RATING,
                              Data.ParkAndScenarioData.MAX_PARK_RATING
                            )
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground:
                          baseData.global.colour_scheme.progressbar_normal.store
                      })
                    ]
                  }),
                  // Park Rating Average
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario.park_rating_ave
                            .store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label.park_rating_ave
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label.park_rating_ave,
                                  value * 100
                                )
                              default:
                                return ""
                            }
                          }
                        )
                      }),
                      progressBar({
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario.park_rating_ave
                            .store,
                          (value) => {
                            return MathUtils.normalise(
                              value,
                              Data.ParkAndScenarioData.MIN_PARK_RATING,
                              Data.ParkAndScenarioData.MAX_PARK_RATING
                            )
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground:
                          baseData.global.colour_scheme.progressbar_normal.store
                      })
                    ]
                  }),
                  // Park Rating Year Average
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario.park_rating_year_ave
                            .store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label
                                  .park_rating_year_ave
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label.park_rating_year_ave,
                                  value * 100
                                )
                              default:
                                return ""
                            }
                          }
                        )
                      }),
                      progressBar({
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario.park_rating_year_ave
                            .store,
                          (value) => {
                            return MathUtils.normalise(
                              value,
                              Data.ParkAndScenarioData.MIN_PARK_RATING,
                              Data.ParkAndScenarioData.MAX_PARK_RATING
                            )
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground:
                          baseData.global.colour_scheme.progressbar_normal.store
                      })
                    ]
                  }),
                  // Park Rating Month Average
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario.park_rating_month_ave
                            .store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label
                                  .park_rating_month_ave
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label.park_rating_month_ave,
                                  value * 100
                                )
                              default:
                                return ""
                            }
                          }
                        )
                      }),
                      progressBar({
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario.park_rating_month_ave
                            .store,
                          (value) => {
                            return MathUtils.normalise(
                              value,
                              Data.ParkAndScenarioData.MIN_PARK_RATING,
                              Data.ParkAndScenarioData.MAX_PARK_RATING
                            )
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground:
                          baseData.global.colour_scheme.progressbar_normal.store
                      })
                    ]
                  }),
                  // Park Rating Warning Days
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario
                            .park_rating_warning_days.store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label
                                  .park_rating_warning_days
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label
                                    .park_rating_warning_days,
                                  Data.ParkAndScenarioData
                                    .MAX_RATING_WARNING_DAYS - value
                                )
                              default:
                                return ""
                            }
                          }
                        ),
                        tooltip:
                          language.ui.main.tooltip.park_rating_warning_days
                      }),
                      progressBar({
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario
                            .park_rating_warning_days.store,
                          () => {
                            return Data.ParkAndScenarioData.getWarningDaysPercentage()
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground: compute(
                          baseData.local.park_and_scenario
                            .park_rating_warning_days.store,
                          baseData.global.colour_scheme.progressbar_warning
                            .store,
                          baseData.global.colour_scheme.progressbar_normal
                            .store,
                          (_days, colour_warning, colour_normal) => {
                            if (
                              Data.ParkAndScenarioData.getWarningDaysPercentage() <=
                              Data.ParkAndScenarioData
                                .RATING_WARNING_DAYS_THRESHOLD
                            ) {
                              return colour_warning
                            }
                            return colour_normal
                          }
                        )
                      })
                    ]
                  })
                ]
              }),
              // Objective
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.objective,
                content: [
                  // Objective Status
                  label({
                    text: compute(
                      baseData.local.park_and_scenario.objective_status.store,
                      (value) => {
                        return context.formatString(
                          language.ui.main.label.objective_status,
                          value
                        )
                      }
                    )
                  }),
                  // Days Left
                  horizontal({
                    content: [
                      label({
                        text: compute(
                          baseData.local.park_and_scenario.objective_days_left
                            .store,
                          baseData.local.options.display_mode.store,
                          (value, mode) => {
                            switch (mode) {
                              case Data.Options.DisplayMode.PROGRESS_BAR:
                                return language.ui.main.label
                                  .objective_status_days_left
                              case Data.Options.DisplayMode.VALUE:
                                return context.formatString(
                                  language.ui.main.label
                                    .objective_status_days_left,
                                  value
                                )
                              default:
                                return ""
                            }
                          }
                        )
                      }),
                      progressBar({
                        disabled: compute(
                          baseData.local.park_and_scenario.objective_days_left
                            .store,
                          () => {
                            return (
                              !Data.ParkAndScenarioData.Objective.hasDateRestriction() ||
                              Data.ParkAndScenarioData.Objective.daysLeft() ===
                                0
                            )
                          }
                        ),
                        visibility: compute(
                          baseData.local.options.display_mode.store,
                          (value) => {
                            return value ===
                              Data.Options.DisplayMode.PROGRESS_BAR
                              ? "visible"
                              : "none"
                          }
                        ),
                        percentFilled: compute(
                          baseData.local.park_and_scenario.objective_days_left
                            .store,
                          () => {
                            return Data.ParkAndScenarioData.Objective.daysLeftPercentage()
                          }
                        ),
                        background: baseData.global.colour_scheme.primary.store,
                        foreground: compute(
                          baseData.local.park_and_scenario.objective_days_left
                            .store,
                          baseData.global.colour_scheme.progressbar_warning
                            .store,
                          baseData.global.colour_scheme.progressbar_normal
                            .store,
                          (_days, colour_warning, colour_normal) => {
                            if (
                              Data.ParkAndScenarioData.Objective.daysLeftShouldWarn()
                            ) {
                              return colour_warning
                            }
                            return colour_normal
                          }
                        )
                      })
                    ]
                  })
                ]
              }),
              // Entity Count
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.entity_count,
                content: [
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_total
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_total,
                            value
                          )
                      ),
                      tooltip:
                        language.ui.main.tooltip.entity_count_total_limitation
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_guest
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_guest,
                            value
                          )
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_staff
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_staff,
                            value
                          )
                      )
                    })
                  ]),
                  // Entity Count
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_balloon
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_balloon,
                            value
                          )
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_duck
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_duck,
                            value
                          )
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_litter
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.entity_count_litter,
                            value
                          )
                      )
                    })
                  ])
                ]
              }),
              // Research
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.research,
                content: [
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.reseach_invented_items
                          .store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.research_invented_items,
                            value
                          )
                      ),
                      tooltip: language.ui.main.tooltip.research_invented_items
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario
                          .reseach_uninvented_items.store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.research_uninvented_items,
                            value
                          )
                      ),
                      tooltip:
                        language.ui.main.tooltip.research_uninvented_items
                    })
                  ])
                ]
              })
            ]
          }),
          // Finance
          groupbox({
            text: language.ui.main.groupbox.finance.title,
            content: [
              // Total Income
              label({
                text: compute(
                  baseData.local.finance.total_income.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.finance_total_income,
                      value
                    )
                )
              }),
              // Total Profit
              label({
                text: compute(
                  baseData.local.finance.total_income.store,
                  baseData.local.finance.total_expenditure.store,
                  (income, expenditure) =>
                    context.formatString(
                      language.ui.main.label.finance_total_profit,
                      income + expenditure
                    )
                )
              }),
              // Total Expenditure
              label({
                text: compute(
                  baseData.local.finance.total_expenditure.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.finance_total_expenditure,
                      value
                    )
                )
              }),
              // Company Value
              label({
                text: compute(
                  baseData.local.finance.company_value.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.finance_company_value,
                      value
                    )
                )
              }),
              // Company Value Record
              label({
                text: compute(
                  baseData.local.finance.company_value_record.store,
                  (value) => {
                    return context.formatString(
                      language.ui.main.label.finance_company_value_record,
                      value
                    )
                  }
                ),
                tooltip: language.ui.main.tooltip.finance_company_value_record
              })
            ]
          })
        ]),
        vertical([
          // Rides
          groupbox({
            text: language.ui.main.groupbox.rides.title,
            content: [
              // Ride Counts
              horizontal([
                // Ride Count Total
                label({
                  text: compute(
                    baseData.local.rides.ride_count_total.store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label.ride_count_total,
                        value
                      )
                  )
                }),
                // Ride Count Flat
                label({
                  text: compute(
                    baseData.local.rides.ride_count_flat.store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label.ride_count_flat,
                        value
                      )
                  )
                }),
                // Ride Count Tracked
                label({
                  text: compute(
                    baseData.local.rides.ride_count_tracked.store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label.ride_count_tracked,
                        value
                      )
                  )
                })
              ]),
              // Ride Excitement Average
              label({
                text: compute(
                  baseData.local.rides.ride_excitement_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_excitement_ave,
                      value * 100
                    )
                )
              }),
              // Ride Intensity Average
              label({
                text: compute(
                  baseData.local.rides.ride_intensity_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_intensity_ave,
                      value * 100
                    )
                )
              }),
              // Ride Nausea Average
              label({
                text: compute(
                  baseData.local.rides.ride_nausea_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_nausea_ave,
                      value * 100
                    )
                )
              }),
              // Ride Value Average
              label({
                text: compute(
                  baseData.local.rides.ride_value_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_value_ave,
                      value
                    )
                ),
                tooltip: language.ui.main.tooltip.ride_value_ave
              }),
              // Ride Price Average
              label({
                text: compute(
                  baseData.local.rides.ride_price_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_price_ave,
                      value
                    )
                )
              }),
              // Ride Admission Average
              label({
                text: compute(
                  baseData.local.rides.ride_admission_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_admission_ave,
                      value * 100
                    )
                )
              }),
              // Ride Age Average
              label({
                text: compute(
                  baseData.local.rides.ride_age_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_age_ave,
                      value * 100
                    )
                )
              }),
              // Ride Downtime Average
              label({
                text: compute(
                  baseData.local.rides.ride_downtime_ave.store,
                  (value) =>
                    context.formatString(
                      language.ui.main.label.ride_downtime_ave,
                      value
                    )
                )
              }),
              // Crashes
              groupbox({
                text: language.ui.main.groupbox.rides.crashes,
                content: [
                  horizontal([
                    // Total Crashes
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_total.store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.crash_count_total,
                            value
                          )
                      )
                    }),
                    // Crashes into Vehicle
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_vehicle.store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.crash_count_into_vehicle,
                            value
                          )
                      )
                    })
                  ]),
                  horizontal([
                    // Crashes into Land
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_land.store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.crash_count_into_land,
                            value
                          )
                      )
                    }),
                    // Crashes into Water
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_water.store,
                        (value) =>
                          context.formatString(
                            language.ui.main.label.crash_count_into_water,
                            value
                          )
                      )
                    })
                  ])
                ]
              })
            ]
          }),
          // Stalls & Facilities
          groupbox({
            text: language.ui.main.groupbox.stalls_and_facilities.title,
            content: [
              horizontal([
                label({
                  text: compute(
                    baseData.local.stalls_and_facilities
                      .stalls_and_facilities_count_total.store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label
                          .stalls_and_facilities_count_total,
                        value
                      )
                  )
                }),
                label({
                  text: compute(
                    baseData.local.stalls_and_facilities.stalls_count_total
                      .store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label.stalls_count_total,
                        value
                      )
                  )
                }),
                label({
                  text: compute(
                    baseData.local.stalls_and_facilities.facilities_count_total
                      .store,
                    (value) =>
                      context.formatString(
                        language.ui.main.label.facilities_count_total,
                        value
                      )
                  )
                })
              ])
            ]
          }),
          // Options
          groupbox({
            text: language.ui.main.groupbox.options.title,
            content: [
              // Update Status
              horizontal({
                content: [
                  button({
                    width: "25px",
                    height: "25px",
                    tooltip: compute(
                      baseData.local.options.update_status.store,
                      (value) => {
                        switch (value) {
                          case Data.Options.UpdateStatus.RUNNING:
                            return language.ui.main.tooltip
                              .options_update_running
                          case Data.Options.UpdateStatus.MANUAL:
                            return language.ui.main.tooltip
                              .options_update_manual
                          case Data.Options.UpdateStatus.PAUSED:
                            return language.ui.main.tooltip
                              .options_update_paused
                          default:
                            return ""
                        }
                      }
                    ),
                    border: false,
                    image: compute(
                      baseData.local.options.update_status.store,
                      (value) => {
                        switch (value) {
                          case Data.Options.UpdateStatus.RUNNING:
                            return Sprites.SYNC_RUNNING
                          case Data.Options.UpdateStatus.MANUAL:
                            return Sprites.SYNC_MANUAL
                          case Data.Options.UpdateStatus.PAUSED:
                            return Sprites.SYNC_PAUSED
                          default:
                            return -1
                        }
                      }
                    ),
                    onClick: () => {
                      baseData.local.options.update_status.store.set(
                        Data.Options.UpdateStatus.next(
                          baseData.local.options.update_status.store.get()
                        )
                      )
                      switch (
                        baseData.local.options.update_status.store.get()
                      ) {
                        case Data.Options.UpdateStatus.RUNNING:
                          interval.resumeAll()
                          break
                        case Data.Options.UpdateStatus.MANUAL:
                          interval.pauseManual()
                          break
                        case Data.Options.UpdateStatus.PAUSED:
                          interval.pauseAll()
                          break
                        default:
                          break
                      }
                    }
                  }),
                  label({
                    padding: { top: 5 },
                    text: compute(
                      baseData.local.options.update_status.store,
                      (value) => {
                        switch (value) {
                          case Data.Options.UpdateStatus.RUNNING:
                            return language.ui.main.label.options_update_running
                          case Data.Options.UpdateStatus.MANUAL:
                            return language.ui.main.label.options_update_manual
                          case Data.Options.UpdateStatus.PAUSED:
                            return language.ui.main.label.options_update_paused
                          default:
                            return ""
                        }
                      }
                    )
                  })
                ]
              }),
              // Sync Now Button
              horizontal({
                content: [
                  button({
                    width: "25px",
                    height: "25px",
                    image: Sprites.SYNC_RELOAD,
                    disabled: compute(
                      baseData.local.options.update_status.store,
                      (value) => value === Data.Options.UpdateStatus.PAUSED
                    ),
                    onClick: () => {
                      Data.updateAll()
                      if (
                        baseData.local.options.update_status.store.get() ===
                        Data.Options.UpdateStatus.MANUAL
                      ) {
                        toggleManualIndicatorLit(true)
                        baseData.local.options.update_status.store.set(
                          Data.Options.UpdateStatus.MANUAL // Force an update on subsribers to update the indicator light
                        )
                        context.setTimeout(() => {
                          toggleManualIndicatorLit(false)
                          baseData.local.options.update_status.store.set(
                            Data.Options.UpdateStatus.MANUAL // Force an update on subsribers to update the indicator light
                          )
                        }, 1000 * 3)
                      } else if (
                        baseData.local.options.update_status.store.get() ===
                        Data.Options.UpdateStatus.RUNNING
                      ) {
                        // Reset the countdown progress when the sync now button is clicked.
                        interval.syncCounter()
                      }
                    }
                  }),
                  label({
                    padding: { top: 5 },
                    text: language.ui.main.label.options_sync_now
                  })
                ]
              }),
              // Toggle progress bar / exact values
              horizontal({
                content: [
                  button({
                    width: "25px",
                    height: "25px",
                    image: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        switch (value) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return Sprites.SHOW_PROGRESS_BAR
                          case Data.Options.DisplayMode.VALUE:
                            return Sprites.SHOW_VALUE
                          default:
                            return -1
                        }
                      }
                    ),
                    onClick: () => {
                      baseData.local.options.display_mode.store.set(
                        (baseData.local.options.display_mode.store.get() + 1) %
                          2
                      )
                    }
                  }),
                  label({
                    padding: { top: 5 },
                    text: compute(
                      baseData.local.options.display_mode.store,
                      (value) => {
                        switch (value) {
                          case Data.Options.DisplayMode.PROGRESS_BAR:
                            return language.ui.main.label
                              .options_display_progress_bar
                          case Data.Options.DisplayMode.VALUE:
                            return language.ui.main.label.options_display_value
                          default:
                            return ""
                        }
                      }
                    )
                  })
                ]
              }),
              // Advanced Options
              horizontal({
                content: [
                  button({
                    width: "25px",
                    height: "25px",
                    image: Sprites.ADVANCED_OPTIONS,
                    onClick: () => {
                      Advanced.open()
                    }
                  }),
                  label({
                    padding: { top: 5 },
                    text: language.ui.main.label.options_advanced_options
                  })
                ]
              }),
              // Indicator Lights
              horizontal({
                content: Indicators
              })
            ]
          }),
          // Credits
          label({
            text: DynamicDashboard.name + "@" + DynamicDashboard.version,
            width: "170px",
            padding: { top: network.mode === "none" ? 0 : 68, left: "1w" },
            disabled: true
          }),
          label({
            text: DynamicDashboard.authors[0],
            width: "78px",
            padding: { left: "1w" },
            disabled: true
          })
        ])
      ])
    ],
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  }
}

function updateColourScheme(type: number, colour: Colour) {
  let windowParams = getWindowParams()
  if (typeof windowParams.colours !== "undefined") {
    windowParams.colours[type] = colour
  }
  // Reopen the window with the new colour scheme
  windowTemplate.close()
  windowTemplate = window(windowParams)
  open()
}

function init(): void {
  ui.registerMenuItem(language.ui.main.title, open)

  // Create the window
  windowTemplate = window(getWindowParams())

  // Subscribe to colour scheme changes
  baseData.global.colour_scheme.primary.store.subscribe((colour) => {
    updateColourScheme(0, colour)
    Advanced.open() // Re-focus the advanced window
  })
  baseData.global.colour_scheme.secondary.store.subscribe((colour) => {
    updateColourScheme(1, colour)
    Advanced.open()
  })
}

function open(): void {
  if (context.mode !== "normal") return
  if (!isOpen)
    // Open the window if it is not open.
    windowTemplate.open()
  // Focus the window if it is open.
  else windowTemplate.focus()
}

function redefine(): void {
  windowTemplate = window(getWindowParams())
}

export { init, open, redefine }

import {
  Colour,
  FlexiblePosition,
  WidgetCreator,
  button,
  compute,
  groupbox,
  horizontal,
  label,
  vertical,
  window
} from "openrct2-flexui"
import { language, tr } from "../languages/lang"
import { baseData } from "../data/main"
import { getCurrencyUnit } from "../data/currency"
import interval from "../utils/interval"
import Sprites from "./custom/sprites"
import Data from "../data/index"
import { progressBar } from "./custom/progress_bar"
import { GuestData } from "../data/guest"

/**
 * Whether the window is open.
 */
let isOpen: boolean = false

let manualIndicatorLit: boolean = false

function initMainMenu(): void {
  ui.registerMenuItem(language.ui.main.title, menu)
}

function openMainMenu(): void {
  menu()
}

/**
 * Creates an indicator widget based on the provided position.
 * @param pos The position of the indicator.
 * @returns A widget creator function that creates the indicator widget.
 */
function createIndicator(pos: number): WidgetCreator<FlexiblePosition> {
  return button({
    height: "20px",
    image: compute(
      baseData.local.options.update_status.store,
      baseData.local.options.countdown_progress.store,
      (v1, v2) => {
        switch (v1) {
          case Data.Options.UpdateStatus.RUNNING:
            if (pos <= v2 * (10 / baseData.global.update_ratio.get()))
              return Sprites.INDICATOR_RUNNING_LIT
            return Sprites.INDICATOR_RUNNING_UNLIT
          case Data.Options.UpdateStatus.MANUAL:
            return manualIndicatorLit
              ? Sprites.INDICATOR_MANUAL_LIT
              : Sprites.INDICATOR_MANUAL_UNLIT
          case Data.Options.UpdateStatus.PAUSED:
            return Sprites.INDICATOR_PAUSED_LIT
          default:
            return -1
        }
      }
    )
  })
}

const Indicators: WidgetCreator<FlexiblePosition>[] = [
  createIndicator(1),
  createIndicator(2),
  createIndicator(3),
  createIndicator(4),
  createIndicator(5),
  createIndicator(6),
  createIndicator(7),
  createIndicator(8),
  createIndicator(9),
  createIndicator(10)
]

/**
 * Open the main menu.
 *
 * @returns {void}
 */
function menu(): void {
  /**
   * Main window template.
   */
  const main_ui = window({
    title: language.ui.main.title,
    width: 800,
    // Accomodate more statistics when playing in servers.
    height: network.mode === "none" ? 500 : 570,
    position: "center",
    content: [
      horizontal([
        vertical([
          // Player
          groupbox({
            text: language.ui.main.groupbox.player.title,
            content: [
              label({
                text:
                  language.ui.main.label.player_name +
                  network.currentPlayer.name,
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text:
                  language.ui.main.label.player_id + network.currentPlayer.id,
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: compute(
                  baseData.local.player.game_time_real.store,
                  (value) => tr(language.ui.main.label.game_time_real, value)
                ),
                visibility: "visible"
              }),
              label({
                text: compute(
                  baseData.local.player.game_time_fake.store,
                  (value) => tr(language.ui.main.label.game_time_fake, value)
                ),
                visibility: "visible"
              }),
              groupbox({
                text: language.ui.main.groupbox.player.action_statistics,
                content: [
                  label({
                    text: compute(
                      baseData.local.player.action_track_design.store,
                      (value) =>
                        language.ui.main.label.action_track_design + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_stall_and_facility_placement
                        .store,
                      (value) =>
                        language.ui.main.label
                          .action_stall_and_facility_placement + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_footpath_placement.store,
                      (value) =>
                        language.ui.main.label.action_footpath_placement + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_scenery_placement.store,
                      (value) =>
                        language.ui.main.label.action_scenery_placement + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_landscaping.store,
                      (value) =>
                        language.ui.main.label.action_landscaping + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_staff.store,
                      (value) => language.ui.main.label.action_staff + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_relocate_peep.store,
                      (value) =>
                        language.ui.main.label.action_relocate_peep + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_pop_balloon.store,
                      (value) =>
                        language.ui.main.label.action_pop_balloon + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_set_cheats.store,
                      (value) =>
                        language.ui.main.label.action_set_cheats + value
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_server_join.store,
                      (value) =>
                        language.ui.main.label.action_server_join + value
                    ),
                    visibility: network.mode === "none" ? "none" : "visible"
                  }),
                  label({
                    text: compute(
                      baseData.local.player.action_server_chat.store,
                      (value) =>
                        language.ui.main.label.action_server_chat + value
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
              label({
                text: compute(
                  baseData.local.guest.guest_generation_total.store,
                  (value) =>
                    language.ui.main.label.guest_generation_total +
                    value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_admission_total.store,
                  (value) =>
                    language.ui.main.label.guest_admission_total +
                    value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_count_current.store,
                  (value) =>
                    language.ui.main.label.guest_count_current +
                    value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_soft_cap.store,
                  (value) =>
                    language.ui.main.label.guest_soft_cap + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_weight_ave.store,
                  (value) =>
                    language.ui.main.label.guest_weight_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_wealth_ave.store,
                  (value) =>
                    tr(
                      language.ui.main.label.guest_wealth_ave,
                      getCurrencyUnit(value)
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
                            return (
                              language.ui.main.label.guest_happiness_ave +
                              value.toString()
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
                        return value / GuestData.MAX_HAPPINESS
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_happiness_ave.store,
                      (value) => {
                        if (value < GuestData.HAPINESS_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
                      }
                    )
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
                            return (
                              language.ui.main.label.guest_energy_ave +
                              value.toString()
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
                        return value / GuestData.MAX_ENERGY
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_energy_ave.store,
                      (value) => {
                        if (value < GuestData.ENERGY_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
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
                            return (
                              language.ui.main.label.guest_nausea_ave +
                              value.toString()
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
                        return value / GuestData.MAX_NAUSEA
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_nausea_ave.store,
                      (value) => {
                        if (value > GuestData.NAUSEA_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
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
                            return (
                              language.ui.main.label.guest_hunger_ave +
                              value.toString()
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
                        return value / GuestData.MAX_HUNGER
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_hunger_ave.store,
                      (value) => {
                        if (value > GuestData.HUNGER_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
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
                            return (
                              language.ui.main.label.guest_thirst_ave +
                              value.toString()
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
                        return value / GuestData.MAX_THIRST
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_thirst_ave.store,
                      (value) => {
                        if (value > GuestData.THIRST_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
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
                            return (
                              language.ui.main.label.guest_toilet_ave +
                              value.toString()
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
                        return value / GuestData.MAX_TOILET
                      }
                    ),
                    background: Colour.Grey,
                    foreground: compute(
                      baseData.local.guest.guest_toilet_ave.store,
                      (value) => {
                        if (value > GuestData.TOILET_WARNING_THRESHOLD)
                          return Colour.BrightRed
                        return Colour.BrightGreen
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
            height: "50%",
            content: [
              horizontal([
                label({
                  text: compute(
                    baseData.local.park_and_scenario.park_value.store,
                    (value) =>
                      tr(
                        language.ui.main.label.park_value,
                        getCurrencyUnit(value)
                      )
                  )
                }),
                label({
                  text: compute(
                    baseData.local.park_and_scenario.park_size.store,
                    (value) => tr(language.ui.main.label.park_size, value)
                  )
                })
              ]),
              groupbox({
                // Park Rating
                text: language.ui.main.groupbox.park_and_scenario.park_rating,
                content: [
                  label({
                    text: compute(
                      baseData.local.park_and_scenario.park_rating.store,
                      (value) =>
                        language.ui.main.label.park_rating_current +
                        value.toString()
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.park_and_scenario.park_rating_ave.store,
                      (value) =>
                        language.ui.main.label.park_rating_ave +
                        value.toString()
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.park_and_scenario.park_rating_year_ave
                        .store,
                      (value) =>
                        language.ui.main.label.park_rating_year_ave +
                        value.toString()
                    )
                  }),
                  label({
                    text: compute(
                      baseData.local.park_and_scenario.park_rating_month_ave
                        .store,
                      (value) =>
                        language.ui.main.label.park_rating_month_ave +
                        value.toString()
                    )
                  })
                ]
              }),
              groupbox({
                // Entity Count
                text: language.ui.main.groupbox.park_and_scenario.entity_count,
                content: [
                  horizontal([
                    // horizontally organize statistics in group of two
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_total
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_total +
                          value.toString()
                      ),
                      tooltip:
                        language.ui.main.tooltip.entity_count_total_limitation
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_guest
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_guest +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_staff
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_staff +
                          value.toString()
                      )
                    })
                  ]),
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_balloon
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_balloon +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_duck
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_duck +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.entity_count_litter
                          .store,
                        (value) =>
                          language.ui.main.label.entity_count_litter +
                          value.toString()
                      )
                    })
                  ])
                ]
              }),
              groupbox({
                // Research
                text: language.ui.main.groupbox.park_and_scenario.research,
                height: "1w",
                content: [
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.park_and_scenario.reseach_invented_items
                          .store,
                        (value) =>
                          language.ui.main.label.research_invented_items +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.park_and_scenario
                          .reseach_uninvented_items.store,
                        (value) =>
                          language.ui.main.label.research_uninvented_items +
                          value.toString()
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
            height: "10%",
            content: [
              horizontal([
                label({
                  text: compute(
                    baseData.local.stalls_and_facilities
                      .stalls_and_facilities_count_total.store,
                    (value) =>
                      tr(
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
                      tr(language.ui.main.label.stalls_count_total, value)
                  )
                }),
                label({
                  text: compute(
                    baseData.local.stalls_and_facilities.facilities_count_total
                      .store,
                    (value) =>
                      tr(language.ui.main.label.facilities_count_total, value)
                  )
                })
              ])
            ]
          }),
          // Finance
          groupbox({
            text: language.ui.main.groupbox.finance.title,
            height: "40%",
            content: [
              label({
                text: compute(
                  baseData.local.finance.total_income.store,
                  (value) =>
                    tr(
                      language.ui.main.label.finance_total_income,
                      getCurrencyUnit(value)
                    )
                )
              }),
              label({
                text: compute(
                  baseData.local.finance.total_expenditure.store,
                  (value) =>
                    tr(
                      language.ui.main.label.finance_total_expenditure,
                      getCurrencyUnit(value)
                    )
                )
              }),
              label({
                text: compute(
                  baseData.local.finance.company_value.store,
                  (value) =>
                    tr(
                      language.ui.main.label.finance_company_value,
                      getCurrencyUnit(value)
                    )
                )
              })
            ]
          })
        ]),
        vertical([
          // Rides
          groupbox({
            text: language.ui.main.groupbox.rides.title,
            height: "50%",
            content: [
              horizontal([
                label({
                  text: compute(
                    baseData.local.rides.ride_count_total.store,
                    (value) =>
                      language.ui.main.label.ride_count_total + value.toString()
                  )
                }),
                label({
                  text: compute(
                    baseData.local.rides.ride_count_flat.store,
                    (value) =>
                      language.ui.main.label.ride_count_flat + value.toString()
                  )
                }),
                label({
                  text: compute(
                    baseData.local.rides.ride_count_tracked.store,
                    (value) =>
                      language.ui.main.label.ride_count_tracked +
                      value.toString()
                  )
                })
              ]),
              label({
                text: compute(
                  baseData.local.rides.ride_excitement_ave.store,
                  (value) =>
                    language.ui.main.label.ride_excitement_ave +
                    value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_intensity_ave.store,
                  (value) =>
                    language.ui.main.label.ride_intensity_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_nausea_ave.store,
                  (value) =>
                    language.ui.main.label.ride_nausea_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_value_ave.store,
                  (value) =>
                    tr(
                      language.ui.main.label.ride_value_ave,
                      getCurrencyUnit(value)
                    )
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_price_ave.store,
                  (value) =>
                    tr(
                      language.ui.main.label.ride_price_ave,
                      getCurrencyUnit(value)
                    )
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_admission_ave.store,
                  (value) =>
                    language.ui.main.label.ride_admission_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_age_ave.store,
                  (value) =>
                    tr(language.ui.main.label.ride_age_ave, value.toString())
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_downtime_ave.store,
                  (value) =>
                    tr(
                      language.ui.main.label.ride_downtime_ave,
                      value.toString()
                    )
                )
              }),
              groupbox({
                // Crashes
                text: language.ui.main.groupbox.rides.crashes,
                content: [
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_total.store,
                        (value) =>
                          language.ui.main.label.crash_count_total +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_vehicle.store,
                        (value) =>
                          language.ui.main.label.crash_count_into_vehicle +
                          value.toString()
                      )
                    })
                  ]),
                  horizontal([
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_land.store,
                        (value) =>
                          language.ui.main.label.crash_count_into_land +
                          value.toString()
                      )
                    }),
                    label({
                      text: compute(
                        baseData.local.rides.crash_count_into_water.store,
                        (value) =>
                          language.ui.main.label.crash_count_into_water +
                          value.toString()
                      )
                    })
                  ])
                ]
              })
            ]
          }),
          // Options
          groupbox({
            text: language.ui.main.groupbox.options.title,
            height: "50%",
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
                    padding: ["5px", "0px", "0px", "0px"],
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
                        manualIndicatorLit = true
                        baseData.local.options.update_status.store.set(
                          Data.Options.UpdateStatus.MANUAL // Force an update on subsribers to update the indicator light
                        )
                        context.setTimeout(() => {
                          manualIndicatorLit = false
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
                    padding: ["5px", "0px", "0px", "0px"],
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
              // Indicator Lights
              horizontal({
                content: Indicators
              })
            ]
          })
        ])
      ])
    ],
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  })

  if (!isOpen)
    // Open the window if it is not open.
    main_ui.open()
  // Focus the window if it is open.
  else main_ui.focus()
}

export { initMainMenu, openMainMenu }

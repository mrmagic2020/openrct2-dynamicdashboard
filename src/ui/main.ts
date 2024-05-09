import {
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

/**
 * Whether the window is open.
 */
let isOpen = false

function initMainMenu(): void {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem(language.ui.main.title, menu)
  }
}

/**
 * Open the main menu.
 *
 * @returns {void}
 */
function menu(): void {
  /**
   * Main window template.
   */
  const win_template = window({
    title: language.ui.main.title,
    width: 800,
    // Accomodate more statistics when playing in servers.
    height: network.mode === "none" ? 500 : 570,
    position: "center",
    // direction: LayoutDirection.Horizontal,
    content: [
      horizontal([
        vertical([
          groupbox({
            // Player
            text: language.ui.main.groupbox.player.title,
            // width: "30%",
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
          groupbox({
            // Guest
            text: language.ui.main.groupbox.guest.title,
            // width: "40%",
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
              label({
                text: compute(
                  baseData.local.guest.guest_happiness_ave.store,
                  (value) =>
                    language.ui.main.label.guest_happiness_ave +
                    value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_energy_ave.store,
                  (value) =>
                    language.ui.main.label.guest_energy_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_nausea_ave.store,
                  (value) =>
                    language.ui.main.label.guest_nausea_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_hunger_ave.store,
                  (value) =>
                    language.ui.main.label.guest_hunger_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_thirst_ave.store,
                  (value) =>
                    language.ui.main.label.guest_thirst_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.guest.guest_toilet_ave.store,
                  (value) =>
                    language.ui.main.label.guest_toilet_ave + value.toString()
                )
              })
            ]
          })
        ]),
        vertical([
          groupbox({
            // Park & Scenario
            text: language.ui.main.groupbox.park_and_scenario.title,
            // width: "40%",
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
          groupbox({
            text: language.ui.main.groupbox.stalls_and_facilities.title,
            height: "25%",
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
              ]),
              groupbox({
                text: language.ui.main.groupbox.stalls_and_facilities.prices,
                content: []
              })
            ]
          })
        ]),
        vertical([
          groupbox({
            // Rides
            text: language.ui.main.groupbox.rides.title,
            // width: "30%",
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
                    language.ui.main.label.ride_value_ave + value.toString()
                )
              }),
              label({
                text: compute(
                  baseData.local.rides.ride_price_ave.store,
                  (value) =>
                    language.ui.main.label.ride_price_ave + value.toString()
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
          })
        ])
      ])
    ],
    onOpen: () => (isOpen = true),
    onClose: () => (isOpen = false)
  })

  if (!isOpen)
    // Open the window if it is not open.
    win_template.open()
  // Focus the window if it is open.
  else win_template.focus()
}

export { initMainMenu }

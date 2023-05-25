import { compute, groupbox, horizontal, label, window } from "openrct2-flexui"
import { language, tr } from "../languages";
import { baseData } from "../data/main";
import { getCurrencyUnit } from "../data/currency";

/**
 * Whether the window is open.
 */
let isOpen = false;

/**
 * Open the main menu.
 */
function menu() {
  /**
   * Main window template.
   */
  const win_template = window({
    title: language.ui.main.title,
    width: 800,
    height: 500,
    position: "center",
    // direction: LayoutDirection.Horizontal,
    content: [
      horizontal(
        [
          groupbox({ // Player
            text: language.ui.main.groupbox.player.title,
            width: "30%",
            content: [
              label({
                text: language.ui.main.label.player_name + network.currentPlayer.name,
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: language.ui.main.label.player_id + network.currentPlayer.id,
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: compute(baseData.local.player.game_time_real.store, (value) => tr(language.ui.main.label.game_time_real, value)),
                visibility: "visible"
              }),
              label({
                text: compute(baseData.local.player.game_time_fake.store, (value) => tr(language.ui.main.label.game_time_fake, value)),
                visibility: "visible"
              }),
              groupbox({
                text: language.ui.main.groupbox.player.action_statistics,
                content: [
                  label({
                    text: compute(baseData.local.player.action_track_design.store, (value) => language.ui.main.label.action_track_design + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_stall_and_facility_placement.store, (value) => language.ui.main.label.action_stall_and_facility_placement + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_footpath_placement.store, (value) => language.ui.main.label.action_footpath_placement + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_scenery_placement.store, (value) => language.ui.main.label.action_scenery_placement + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_landscaping.store, (value) => language.ui.main.label.action_landscaping + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_staff.store, (value) => language.ui.main.label.action_staff + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_relocate_peep.store, (value) => language.ui.main.label.action_relocate_peep + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_pop_balloon.store, (value) => language.ui.main.label.action_pop_balloon + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_set_cheats.store, (value) => language.ui.main.label.action_set_cheats + value)
                  }),
                  label({
                    text: compute(baseData.local.player.action_server_join.store, (value) => language.ui.main.label.action_server_join + value),
                    visibility: network.mode === "none" ? "none" : "visible"
                  }),
                  label({
                    text: compute(baseData.local.player.action_server_chat.store, (value) => language.ui.main.label.action_server_chat + value),
                    visibility: network.mode === "none" ? "none" : "visible"
                  })
                ]
              })
            ]
          }),
          groupbox({ // Park & Scenario
            text: language.ui.main.groupbox.park_and_scenario.title,
            width: "30%",
            content: [
              label({
                text: compute(baseData.local.park_and_scenario.park_value.store, (value) => tr(language.ui.main.label.park_value, getCurrencyUnit(value)))
              }),
              label({
                text: compute(baseData.local.park_and_scenario.park_size.store, (value) => tr(language.ui.main.label.park_size, value))
              }),
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.park_rating,
                content: [
                  label({
                    text: compute(baseData.local.park_and_scenario.park_rating.store, (value) => language.ui.main.label.park_rating_current + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.park_rating_ave.store, (value) => language.ui.main.label.park_rating_ave + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.park_rating_year_ave.store, (value) => language.ui.main.label.park_rating_year_ave + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.park_rating_month_ave.store, (value) => language.ui.main.label.park_rating_month_ave + value.toString())
                  })
                ]
              }),
              groupbox({
                text: language.ui.main.groupbox.park_and_scenario.entity_count,
                content: [
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_total.store, (value) => language.ui.main.label.entity_count_total + value.toString()),
                    tooltip: language.ui.main.tooltip.entity_count_total_limitation
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_guest.store, (value) => language.ui.main.label.entity_count_guest + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_staff.store, (value) => language.ui.main.label.entity_count_staff + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_balloon.store, (value) => language.ui.main.label.entity_count_balloon + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_duck.store, (value) => language.ui.main.label.entity_count_duck + value.toString())
                  }),
                  label({
                    text: compute(baseData.local.park_and_scenario.entity_count_litter.store, (value) => language.ui.main.label.entity_count_litter + value.toString())
                  })
                ]
              })
            ]
          })
        ]
      ),
    ],
    onOpen: () => isOpen = true,
    onClose: () => isOpen = false
  });

  if (!isOpen) // Open the window if it is not open.
    win_template.open();
  else // Focus the window if it is open.
    win_template.focus();
}

export { menu }
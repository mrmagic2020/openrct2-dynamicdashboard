import { compute, groupbox, label, window } from "openrct2-flexui"
import { language, tr } from "../languages";
import { dataStructure } from "../data";

let isOpen = false;
function menu() {
  const win_template = window({
    title: language.ui.main.title,
    width: 800,
    height: 500,
    position: "center",
    content: [
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
            text: compute(dataStructure.local.player.game_time_real.store, (value) => tr(language.ui.main.label.game_time_real, value)),
            visibility: "visible"
          }),
          label({
            text: compute(dataStructure.local.player.game_time_fake.store, (value) => tr(language.ui.main.label.game_time_fake, value)),
            visibility: "visible"
          }),
          groupbox({
            text: language.ui.main.groupbox.player.action_statistics,
            content: [
              label({
                text: compute(dataStructure.local.player.action_track_design.store, (value) => language.ui.main.label.action_track_design + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_stall_and_facility_placement.store, (value) => language.ui.main.label.action_stall_and_facility_placement + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_footpath_placement.store, (value) => language.ui.main.label.action_footpath_placement + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_scenery_placement.store, (value) => language.ui.main.label.action_scenery_placement + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_landscaping.store, (value) => language.ui.main.label.action_landscaping + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_staff.store, (value) => language.ui.main.label.action_staff + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_relocate_peep.store, (value) => language.ui.main.label.action_relocate_peep + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_pop_balloon.store, (value) => language.ui.main.label.action_pop_balloon + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_set_cheats.store, (value) => language.ui.main.label.action_set_cheats + value)
              }),
              label({
                text: compute(dataStructure.local.player.action_server_join.store, (value) => language.ui.main.label.action_server_join + value),
                visibility: network.mode === "none" ? "none" : "visible"
              }),
              label({
                text: compute(dataStructure.local.player.action_server_chat.store, (value) => language.ui.main.label.action_server_chat + value),
                visibility: network.mode === "none" ? "none" : "visible"
              })
            ]
          })
        ]
      })
    ],
    onOpen: () => isOpen = true,
    onClose: () => isOpen = false
  });

  if (!isOpen)
    win_template.open();
  else 
    win_template.focus();
}

export { menu }
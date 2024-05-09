import { baseData } from "./main"
import { increment } from "../storeutil"

interface ActionClass {
  [key: string]: string[]
}

/**
 * Classifications of all recorded actions.
 *
 * Keys **must** be indentical to that of `baseData.local.player`
 *
 * @see baseData.local.player
 */
const actionClass: ActionClass = {
  action_track_design: [
    "trackdesign",
    "trackplace",
    "trackremove",
    "tracksetbrakespeed"
  ],
  action_stall_and_facility_placement: ["ridecreate", "ridedemolish"],
  action_footpath_placement: ["footpathplace", "footpathremove"],
  action_scenery_placement: [
    "smallsceneryplace",
    "smallsceneryremove",
    "wallplace",
    "wallremove",
    "bannerplace",
    "bannerremove",
    "footpathadditionplace",
    "footpathadditionremove"
  ],
  action_landscaping: [
    "landlower",
    "landraise",
    "landsmooth",
    "waterlower",
    "waterraise"
  ],
  action_staff: [
    "stafffire",
    "staffhire",
    "staffsetcolour",
    "staffsetcostume",
    "staffsetname",
    "staffsetorders",
    "staffsetpatrolarea"
  ],
  action_relocate_peep: ["peeppickup"],
  action_pop_balloon: ["balloonpress"],
  action_set_cheats: ["cheatset"]
}

/**
 * Updates the player's real-time game time (minutes).
 */
function updatePlayerRealTimeGameTime(): void {
  increment(baseData.local.player.game_time_real.store, 0.25)
}

/**
 * Updates the fake (in-game) game time for the player.
 */
function updatePlayerFakeGameTime(): void {
  increment(baseData.local.player.game_time_fake.store)
}

/**
 * Updates the action count for the player based on the provided GameActionEventArgs.
 * @param e - The GameActionEventArgs object containing information about the game action.
 */
function updatePlayerActionCount(e: GameActionEventArgs<object>): void {
  if (!e.isClientOnly) {
    /**
     * Iterate through every action classification.
     */
    for (let key in actionClass) {
      if (actionClass[key].indexOf(e.action) !== -1) {
        increment(baseData.local.player[key].store)
      }
    }
  }
}

/**
 * Updates the player's network join count.
 * @param e The network event arguments.
 */
function updatePlayerNetworkJoinCount(e: NetworkEventArgs): void {
  if (e.player === network.currentPlayer.id) {
    increment(baseData.local.player.action_server_join.store)
  }
}

/**
 * Updates the player's network chat count.
 * @param e The network event arguments.
 */
function updatePlayerNetworkChatCount(e: NetworkEventArgs): void {
  if (e.player === network.currentPlayer.id) {
    increment(baseData.local.player.action_server_chat.store)
  }
}

function initPlayerData(): void {
  /**
   * Real-time game time recording (minutes). Updates every 15 seconds.
   */
  context.setInterval(updatePlayerRealTimeGameTime, 15 * 1000)

  context.subscribe("interval.day", updatePlayerFakeGameTime)

  context.subscribe("action.execute", updatePlayerActionCount)

  context.subscribe("network.join", updatePlayerNetworkJoinCount)

  context.subscribe("network.chat", updatePlayerNetworkChatCount)
}

export { initPlayerData }

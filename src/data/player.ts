import { baseData } from "./main"
import { increment } from "../utils/storeUtils"
import { interval } from "../data/main"
import HookManager from "../utils/hooks"

namespace PlayerData {
  type ActionClass = {
    [key in PlayerDataType]?: string[]
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
   *
   * This function is hooked to the "interval.day" event. Returns early if the interval is paused.
   */
  function updatePlayerFakeGameTime(): void {
    if (interval.isPaused) return
    increment(baseData.local.player.game_time_fake.store)
  }

  /**
   * Updates the action count for the player based on the provided GameActionEventArgs.
   *
   * This function is hooked to the "action.execute" event. Returns early if the interval is paused.
   *
   * @param e - The GameActionEventArgs object containing information about the game action.
   */
  function updatePlayerActionCount(e: GameActionEventArgs<object>): void {
    if (interval.isPaused) return
    if (!e.isClientOnly) {
      /**
       * Iterate through every action classification.
       */
      for (const key in actionClass) {
        if (actionClass[key as PlayerDataType]?.indexOf(e.action) !== -1) {
          increment(baseData.local.player[key as PlayerDataType].store)
        }
      }
    }
  }

  /**
   * Updates the player's network join count.
   *
   * This function is hooked to the "network.join" event. Returns early if the interval is paused.
   *
   * @param e The network event arguments.
   */
  function updatePlayerNetworkJoinCount(e: NetworkEventArgs): void {
    if (interval.isPaused) return
    if (e.player === network.currentPlayer.id) {
      increment(baseData.local.player.action_server_join.store)
    }
  }

  /**
   * Updates the player's network chat count.
   *
   * This function is hooked to the "network.chat" event. Returns early if the interval is paused.
   *
   * @param e The network event arguments.
   */
  function updatePlayerNetworkChatCount(e: NetworkEventArgs): void {
    if (interval.isPaused) return
    if (e.player === network.currentPlayer.id) {
      increment(baseData.local.player.action_server_chat.store)
    }
  }

  export function update(): void {}

  export function init(): void {
    /**
     * Real-time game time recording (minutes). Updates every 15 seconds.
     */
    interval.register(updatePlayerRealTimeGameTime, 15 * 1000, false)

    HookManager.hook("interval.day", updatePlayerFakeGameTime)

    HookManager.hook("action.execute", updatePlayerActionCount)

    HookManager.hook("network.join", updatePlayerNetworkJoinCount)

    HookManager.hook("network.chat", updatePlayerNetworkChatCount)
  }
}

export { PlayerData }

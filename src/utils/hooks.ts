import Logger from "./logger"

namespace HookManager {
  interface FunctionDesc {
    readonly id: number
    readonly callback: Function
  }

  type Hanger = {
    [key in HookType]: FunctionDesc[]
  }

  const hanger: Hanger = {
    "action.query": [],
    "action.execute": [],
    "map.changed": [],
    "interval.tick": [],
    "interval.day": [],
    "guest.generation": [],
    "network.chat": [],
    "network.join": [],
    "network.leave": [],
    "ride.ratings.calculate": [],
    "action.location": [],
    "vehicle.crash": [],
    "map.save": [],
    "map.change": [],
    "network.action": []
  }

  let id = 0
  /**
   * Registers a callback function to be executed when a specific hook type is triggered.
   * Note that this does not activate the hook. Call `activate()` to activate all registered hooks.
   *
   * @param type - The type of hook to register the callback for.
   * @param callback - The callback function to be executed when the hook is triggered.
   * @returns The ID of the registered hook.
   */
  export function hook(type: HookType, callback: Function): number {
    hanger[type].push({
      id: id++,
      callback
    })
    return id - 1
  }

  /**
   * Activates the hooks by subscribing to their corresponding events.
   */
  export function activate() {
    Logger.debug("Activating hooks...")
    for (const type in hanger) {
      if (hanger[type as HookType].length === 0) continue
      Logger.debug(`Activating hook: ${type}`)
      context.subscribe(type as HookType, () => {
        hanger[type as HookType].forEach((desc) => {
          desc.callback()
        })
      })
    }
  }
}

export default HookManager

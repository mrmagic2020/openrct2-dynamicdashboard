import HookManager from "../utils/hooks"

namespace Tick {
  let count = 0

  export function init(): void {
    HookManager.hook("interval.tick", () => {
      count++
    })
  }

  export function get(): number {
    return count
  }
}

export default Tick

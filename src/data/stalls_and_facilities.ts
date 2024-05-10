import interval from "../utils/interval"
import { baseData } from "./main"

namespace StallsAndFacilitiesData {
  /**
   * Calculates the sum of stalls and facilities of the specified type.
   * If no type is provided, it returns the total count of all stalls and facilities.
   *
   * @param type - The type of stalls or facilities to calculate the sum for. Can be "stall" or "facility".
   * @returns The sum of stalls and facilities of the specified type, or the total count of all stalls and facilities if no type is provided.
   */
  function getSum(type?: "stall" | "facility"): number {
    if (type === undefined)
      return map.rides.filter((item) => {
        return (
          item.classification === "stall" || item.classification === "facility"
        )
      }).length

    return map.rides.filter((item) => item.classification === type).length
  }

  /**
   * Updates the count of stalls and facilities.
   */
  function updateStallsAndFacilitiesCount(): void {
    baseData.local.stalls_and_facilities.stalls_and_facilities_count_total.store.set(
      getSum()
    )
    baseData.local.stalls_and_facilities.stalls_count_total.store.set(
      getSum("stall")
    )
    baseData.local.stalls_and_facilities.facilities_count_total.store.set(
      getSum("facility")
    )
  }

  export function update(): void {
    updateStallsAndFacilitiesCount()
  }

  export function init(): void {
    interval.register(
      updateStallsAndFacilitiesCount,
      baseData.global.update_ratio.get() * 1000
    )
  }
}

export { StallsAndFacilitiesData }

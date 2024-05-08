import { baseData } from "./main"

function getSum(type?: "stall" | "facility"): number {
  if (type === undefined)
    return map.rides.filter((item) => {
      return (
        item.classification === "stall" || item.classification === "facility"
      )
    }).length

  return map.rides.filter((item) => item.classification === type).length
}

function initStallsAndFacilitiesData(): void {
  context.setInterval(() => {
    /**
     * Update stall and facility count.
     */
    baseData.local.stalls_and_facilities.stalls_and_facilities_count_total.store.set(
      getSum()
    )
    baseData.local.stalls_and_facilities.stalls_count_total.store.set(
      getSum("stall")
    )
    baseData.local.stalls_and_facilities.facilities_count_total.store.set(
      getSum("facility")
    )
  }, baseData.global.update_ratio.get() * 1000)
}

export { getSum, initStallsAndFacilitiesData }
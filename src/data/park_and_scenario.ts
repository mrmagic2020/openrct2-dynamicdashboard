import { baseData, branchData } from "./main"
import { increment } from "../utils/storeutil"
import interval from "../utils/interval"

namespace ParkAndScenarioData {
  /**
   * Updates the park and scenario data based on the current month and year.
   * @param thisMonth - The current month.
   * @param thisYear - The current year.
   */
  function updateParkAndScenarioData(
    thisMonth: number,
    thisYear: number
  ): void {
    baseData.local.park_and_scenario.park_value.store.set(park.value / 10)
    baseData.local.park_and_scenario.park_rating.store.set(park.rating)

    increment(branchData.local.park_and_scenario.park_rating_ave[0].store) // increase denominator by 1
    // branchData.local.park_and_scenario.park_rating_ave[0].store.set(
    //   branchData.local.park_and_scenario.park_rating_ave[0].store.get() + 1
    // )

    increment(
      branchData.local.park_and_scenario.park_rating_ave[1].store,
      park.rating
    ) // add current rating to sum
    // branchData.local.park_and_scenario.park_rating_ave[1].store.set(
    //   branchData.local.park_and_scenario.park_rating_ave[1].store.get() +
    //     park.rating
    // )

    /**
     * Month average calculations.
     */
    if (thisMonth !== date.month) {
      thisMonth = date.month
      increment(
        branchData.local.park_and_scenario.park_rating_month_ave[0].store
      )
      // branchData.local.park_and_scenario.park_rating_month_ave[0].store.set(
      //   branchData.local.park_and_scenario.park_rating_month_ave[0].store.get() +
      //     1
      // )

      increment(
        branchData.local.park_and_scenario.park_rating_month_ave[1].store,
        park.rating
      )
      // branchData.local.park_and_scenario.park_rating_month_ave[1].store.set(
      //   branchData.local.park_and_scenario.park_rating_month_ave[1].store.get() +
      //     park.rating
      // )
    }

    /**
     * Year average calculations.
     */
    if (thisYear !== date.year) {
      thisYear = date.year
      increment(
        branchData.local.park_and_scenario.park_rating_year_ave[0].store
      )
      // branchData.local.park_and_scenario.park_rating_year_ave[0].store.set(
      //   branchData.local.park_and_scenario.park_rating_year_ave[0].store.get() +
      //     1
      // )

      increment(
        branchData.local.park_and_scenario.park_rating_year_ave[1].store,
        park.rating
      )
      // branchData.local.park_and_scenario.park_rating_year_ave[1].store.set(
      //   branchData.local.park_and_scenario.park_rating_year_ave[1].store.get() +
      //     park.rating
      // )
    }

    /**
     * Entity count calculations.
     */
    baseData.local.park_and_scenario.entity_count_total.store.set(
      map.numEntities
    )
    baseData.local.park_and_scenario.entity_count_guest.store.set(
      map.getAllEntities("guest").length
    )
    baseData.local.park_and_scenario.entity_count_staff.store.set(
      map.getAllEntities("staff").length
    )
    baseData.local.park_and_scenario.entity_count_balloon.store.set(
      map.getAllEntities("balloon").length
    )
    baseData.local.park_and_scenario.entity_count_duck.store.set(
      map.getAllEntities("duck").length
    )
    baseData.local.park_and_scenario.entity_count_litter.store.set(
      map.getAllEntities("litter").length
    )

    /**
     * Research progress calculations.
     */
    baseData.local.park_and_scenario.reseach_invented_items.store.set(
      park.research.inventedItems.length
    )
    baseData.local.park_and_scenario.reseach_uninvented_items.store.set(
      park.research.uninventedItems.length
    )
  }

  /**
   * Updates the value of the park size in the local data store.
   */
  function updateParkSizeValue(): void {
    baseData.local.park_and_scenario.park_size.store.set(park.parkSize)
  }

  export function update(): void {
    // updateParkAndScenarioData(date.month, date.year)
    updateParkSizeValue()
  }

  /**
   * Initialize park and scenario data.
   */
  export function init(): void {
    let tickCount_512 = 0
    let tickCount_4096 = 0

    let thisMonth = date.month
    let thisYear = date.year

    context.subscribe("interval.tick", () => {
      if (interval.isPaused) return

      /**
       * Park value and company value are updated every 512 ticks.
       * Park rating update rate is unknown. This will temporarily be placed with
       * park value update.
       *
       * Park size value is updated every 4096 ticks.
       */
      if (tickCount_512 < 512) tickCount_512++
      else {
        tickCount_512 = 0
        updateParkAndScenarioData(thisMonth, thisYear)
      }

      if (tickCount_4096 < 4096) tickCount_4096++
      else {
        tickCount_4096 = 0
        updateParkSizeValue()
      }
    })
  }
}

export { ParkAndScenarioData }

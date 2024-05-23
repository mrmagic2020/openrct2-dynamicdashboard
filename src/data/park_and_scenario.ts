import { baseData, branchData } from "./main"
import { increment } from "../utils/storeutil"
import interval from "../utils/interval"

namespace ParkAndScenarioData {
  /**
   * Updates the park data by setting the park value, park rating, and calculating the average park rating.
   */
  function updateParkData(): void {
    baseData.local.park_and_scenario.park_value.store.set(park.value / 10)
    baseData.local.park_and_scenario.park_rating.store.set(park.rating)

    increment(
      branchData.local.park_and_scenario.park_rating_ave_sample_count.store
    ) // increase denominator by 1

    increment(
      branchData.local.park_and_scenario.park_rating_ave.store,
      park.rating
    ) // add current rating to sum
  }

  function updateEntityCount(): void {
    const guestCount = map.getAllEntities("guest").length
    const staffCount = map.getAllEntities("staff").length
    const balloonCount = map.getAllEntities("balloon").length
    const duckCount = map.getAllEntities("duck").length
    const litterCount = map.getAllEntities("litter").length

    baseData.local.park_and_scenario.entity_count_total.store.set(
      guestCount + staffCount + balloonCount + duckCount + litterCount
    )
    baseData.local.park_and_scenario.entity_count_guest.store.set(guestCount)
    baseData.local.park_and_scenario.entity_count_staff.store.set(staffCount)
    baseData.local.park_and_scenario.entity_count_balloon.store.set(
      balloonCount
    )
    baseData.local.park_and_scenario.entity_count_duck.store.set(duckCount)
    baseData.local.park_and_scenario.entity_count_litter.store.set(litterCount)
  }

  function updateResearchProgress(): void {
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
   * Updates the park and scenario data based on the current month and year.
   * @param thisMonth - The current month.
   * @param thisYear - The current year.
   */
  function updateAverageData(): void {
    let thisMonth = date.month
    let thisYear = date.year
    /**
     * Month average calculations.
     */
    if (thisMonth !== branchData.local.utils.last_updated_month.store.get()) {
      branchData.local.utils.last_updated_month.store.set(thisMonth)
      increment(
        branchData.local.park_and_scenario.park_rating_month_ave_sample_count
          .store
      )
      increment(
        branchData.local.park_and_scenario.park_rating_month_ave.store,
        park.rating
      )
    }

    /**
     * Year average calculations.
     */
    if (thisYear !== branchData.local.utils.last_updated_year.store.get()) {
      branchData.local.utils.last_updated_year.store.set(thisYear)
      increment(
        branchData.local.park_and_scenario.park_rating_year_ave_sample_count
          .store
      )
      increment(
        branchData.local.park_and_scenario.park_rating_year_ave.store,
        park.rating
      )
    }
  }

  /**
   * Updates the value of the park size in the local data store.
   */
  function updateParkSizeValue(): void {
    baseData.local.park_and_scenario.park_size.store.set(park.parkSize)
  }

  export function update(): void {
    updateParkData()
    updateEntityCount()
    updateResearchProgress()
  }

  /**
   * Initialize park and scenario data.
   */
  export function init(): void {
    let tickCount_512 = 0
    let tickCount_4096 = 0

    context.subscribe("interval.tick", () => {
      if (interval.isPaused || context.paused) return

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
        updateAverageData()
      }

      if (tickCount_4096 < 4096) tickCount_4096++
      else {
        tickCount_4096 = 0
        updateParkSizeValue()
      }
    })

    interval.register(update, baseData.global.update_frequency.get() * 1000)
  }
}

export { ParkAndScenarioData }

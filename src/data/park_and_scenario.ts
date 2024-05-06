import { baseData, branchData } from "./main"

/**
 * Initialize park and scenario data.
 */
function initParkAndScenarioData(): void {
  let tickCount_512 = 0
  let tickCount_4096 = 0

  let thisMonth = date.month
  let thisYear = date.year

  context.subscribe("interval.tick", () => {
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

      baseData.local.park_and_scenario.park_value.store.set(park.value / 10)
      baseData.local.park_and_scenario.park_rating.store.set(park.rating)

      branchData.local.park_and_scenario.park_rating_ave[0].store.set(
        branchData.local.park_and_scenario.park_rating_ave[0].store.get() + 1
      ) // increase denominator by 1
      branchData.local.park_and_scenario.park_rating_ave[1].store.set(
        branchData.local.park_and_scenario.park_rating_ave[1].store.get() +
          park.rating
      ) // add current rating to sum

      /**
       * Month average calculations.
       */
      if (thisMonth !== date.month) {
        thisMonth = date.month
        branchData.local.park_and_scenario.park_rating_month_ave[0].store.set(
          branchData.local.park_and_scenario.park_rating_month_ave[0].store.get() +
            1
        )
        branchData.local.park_and_scenario.park_rating_month_ave[1].store.set(
          branchData.local.park_and_scenario.park_rating_month_ave[1].store.get() +
            park.rating
        )
      }

      /**
       * Year average calculations.
       */
      if (thisYear !== date.year) {
        thisYear = date.year
        branchData.local.park_and_scenario.park_rating_year_ave[0].store.set(
          branchData.local.park_and_scenario.park_rating_year_ave[0].store.get() +
            1
        )
        branchData.local.park_and_scenario.park_rating_year_ave[1].store.set(
          branchData.local.park_and_scenario.park_rating_year_ave[1].store.get() +
            park.rating
        )
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

    if (tickCount_4096 < 4096) tickCount_4096++
    else {
      tickCount_4096 = 0

      /**
       * Park size value calculations.
       */
      baseData.local.park_and_scenario.park_size.store.set(park.parkSize)
    }
  })

  // context.subscribe("interval.day", () => {});
}

export { initParkAndScenarioData }

import { baseData, branchData } from "./main"
import { increment } from "../utils/store_utils"
import { interval } from "../data/main"
import HookManager from "../utils/hooks"
import { language } from "../languages/lang"
import DateUtils from "../utils/date_utils"
import MathUtils from "../utils/math_utils"

namespace ParkAndScenarioData {
  export namespace Objective {
    export function parseStatus(status: ScenarioStatus): string {
      switch (status) {
        case "inProgress":
          return language.ui.main.label.objective_status_inProgress
        case "completed":
          return language.ui.main.label.objective_status_completed
        case "failed":
          return language.ui.main.label.objective_status_failed
        default:
          return ""
      }
    }

    const ScenarioObjectiveTypeWithDate: ScenarioObjectiveType[] = [
      "guestsBy",
      "parkValueBy"
    ]
    export function hasDateRestriction(): boolean {
      return (
        ScenarioObjectiveTypeWithDate.indexOf(scenario.objective.type) !== -1
      )
    }
    export function totalDays(): number {
      if (!hasDateRestriction()) return 0
      return DateUtils.getDaysFromDate({
        year: scenario.objective.year,
        month: 7,
        day: 31
      })
    }
    export function daysLeft(): number {
      if (!hasDateRestriction()) return Infinity
      return MathUtils.clamp(totalDays() - DateUtils.getDaysFromDate(date), 0)
    }
    export function daysLeftPercentage(): number {
      if (!hasDateRestriction()) return 1
      return MathUtils.normalise(daysLeft(), 0, totalDays())
    }
    export function daysLeftShouldWarn(): boolean {
      return daysLeftPercentage() <= 0.2
    }

    export function updateStatus(): void {
      const status = scenario.status
      baseData.local.park_and_scenario.objective_status.store.set(
        Objective.parseStatus(status)
      )
    }

    export function updateDaysLeft(): void {
      const daysLeft = Objective.daysLeft()
      baseData.local.park_and_scenario.objective_days_left.store.set(daysLeft)
    }
  }

  export const MIN_PARK_RATING = 0
  export const MAX_PARK_RATING = 1000
  /**
   * The maximum number of days with ratings lower than the minimum park rating before the park is forced to close.
   *
   * Derived from {@link https://github.com/OpenRCT2/OpenRCT2/blob/d4f97d3875ee6d11d37d8648874f80c421a76b04/src/openrct2/scenario/Scenario.cpp#L721 Scenario.cpp}
   */
  export const MAX_RATING_WARNING_DAYS = 29
  export const RATING_WARNING_DAYS_THRESHOLD = 0.25

  /**
   * Updates the park data by setting the park value and park rating.
   */
  function updateParkData(): void {
    baseData.local.park_and_scenario.park_value.store.set(park.value)
    baseData.local.park_and_scenario.park_rating.store.set(park.rating)
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
   * Updates the park rating averages. Park ratings are updated every 512 ticks.
   * @param thisMonth - The current month.
   * @param thisYear - The current year.
   */
  function updateRatingAverages(): void {
    /**
     * All-time average calculations.
     */
    increment(
      branchData.local.park_and_scenario.park_rating_ave_sample_count.store
    ) // increase denominator by 1
    increment(
      branchData.local.park_and_scenario.park_rating_ave.store,
      park.rating
    ) // add current rating to sum

    /**
     * Month average calculations.
     */
    let thisMonth = date.month
    if (thisMonth !== branchData.local.utils.last_updated_month.store.get()) {
      branchData.local.utils.last_updated_month.store.set(thisMonth)
      branchData.local.park_and_scenario.park_rating_month_ave_sample_count.reset()
      branchData.local.park_and_scenario.park_rating_month_ave.reset()
    }
    increment(
      branchData.local.park_and_scenario.park_rating_month_ave_sample_count
        .store
    )
    increment(
      branchData.local.park_and_scenario.park_rating_month_ave.store,
      park.rating
    )

    /**
     * Year average calculations.
     */
    let thisYear = date.year
    if (thisYear !== branchData.local.utils.last_updated_year.store.get()) {
      branchData.local.utils.last_updated_year.store.set(thisYear)
      branchData.local.park_and_scenario.park_rating_year_ave_sample_count.reset()
      branchData.local.park_and_scenario.park_rating_year_ave.reset()
    }
    increment(
      branchData.local.park_and_scenario.park_rating_year_ave_sample_count.store
    )
    increment(
      branchData.local.park_and_scenario.park_rating_year_ave.store,
      park.rating
    )
  }

  /**
   * Updates the value of the park size in the local data store.
   */
  function updateParkSizeValue(): void {
    baseData.local.park_and_scenario.park_size.store.set(park.parkSize)
  }

  function updateWarningDays(): void {
    baseData.local.park_and_scenario.park_rating_warning_days.store.set(
      scenario.parkRatingWarningDays
    )
  }

  export function getWarningDaysPercentage(): number {
    return (
      1 -
      MathUtils.normalise(
        scenario.parkRatingWarningDays,
        0,
        MAX_RATING_WARNING_DAYS
      )
    )
  }

  export function update(): void {
    updateParkData()
    updateEntityCount()
    updateResearchProgress()
    Objective.updateStatus()
    Objective.updateDaysLeft()
  }

  /**
   * Initialize park and scenario data.
   */
  export function init(): void {
    HookManager.hook("interval.tick", () => {
      if (interval.isPaused || context.paused) return

      /**
       * Park data is updated every 512 ticks.
       */
      if (date.ticksElapsed % 512 === 0) {
        updateRatingAverages()
      }

      /**
       * Park size value is updated every 4096 ticks.
       */
      if (date.ticksElapsed % 4096 === 0) {
        updateParkSizeValue()
      }
    })

    HookManager.hook("interval.day", () => {
      if (interval.isPaused) return
      Objective.updateDaysLeft()
      updateWarningDays()
    })

    interval.register(update, baseData.global.update_frequency.get() * 1000)
  }
}

export { ParkAndScenarioData }

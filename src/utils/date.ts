import Logger from "./logger"

namespace DateUtils {
  export interface YMD {
    year: number
    /**
     * 0 is March, 1 is April, ..., 7 is October.
     */
    month: number
    day: number
  }

  /**
   * There are 8 motnhs in a year.
   */
  const MONTH_COUNT = 8
  /**
   * 0 is March, 1 is April, ..., 7 is October.
   */
  const DAYS_IN_MONTH = [31, 30, 31, 30, 31, 31, 30, 31]
  const DAYS_IN_YEAR = DAYS_IN_MONTH.reduce((a, b) => a + b, 0)

  function validateYMD(ymd: YMD): void {
    Logger.assert(ymd.year > 0, "Year must be greater than 0.")
    Logger.assert(
      ymd.month >= 0 && ymd.month < MONTH_COUNT,
      "Month must be between 0 and 7."
    )
    Logger.assert(
      ymd.day > 0 && ymd.day <= DAYS_IN_MONTH[ymd.month],
      "Day must be between 1 and the number of days in the month."
    )
  }

  export function getDaysFromDate(ymd: YMD): number {
    validateYMD(ymd)

    let days = 0
    days += ymd.day - 1
    for (let i = 0; i < ymd.month; i++) {
      days += DAYS_IN_MONTH[i]
    }
    for (let i = 1; i < ymd.year; i++) {
      days += DAYS_IN_YEAR
    }
    return days
  }
}

export default DateUtils

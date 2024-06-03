import test from "ava"
import DateUtils from "../src/utils/date_utils.js"

test("validateYMD throws an error if the year is less than or equal to 0", (t) => {
  const ymd = { year: 0, month: 3, day: 15 }
  t.throws(
    () => {
      DateUtils.validateYMD(ymd)
    },
    {
      instanceOf: Error,
      message: "Assertion failed! Year must be greater than 0."
    }
  )
})

test("validateYMD throws an error if the month is less than 0", (t) => {
  const ymd = { year: 2022, month: -1, day: 15 }
  t.throws(
    () => {
      DateUtils.validateYMD(ymd)
    },
    {
      instanceOf: Error,
      message: "Assertion failed! Month must be between 0 and 7."
    }
  )
})

test("validateYMD throws an error if the month is greater than or equal to 8", (t) => {
  const ymd = { year: 2022, month: 8, day: 15 }
  t.throws(
    () => {
      DateUtils.validateYMD(ymd)
    },
    {
      instanceOf: Error,
      message: "Assertion failed! Month must be between 0 and 7."
    }
  )
})

test("validateYMD throws an error if the day is less than 1", (t) => {
  const ymd = { year: 2022, month: 3, day: 0 }
  t.throws(
    () => {
      DateUtils.validateYMD(ymd)
    },
    {
      instanceOf: Error,
      message:
        "Assertion failed! Day must be between 1 and the number of days in the month."
    }
  )
})

test("validateYMD throws an error if the day is greater than the number of days in the month", (t) => {
  const ymd = { year: 2022, month: 3, day: 32 }
  t.throws(
    () => {
      DateUtils.validateYMD(ymd)
    },
    {
      instanceOf: Error,
      message:
        "Assertion failed! Day must be between 1 and the number of days in the month."
    }
  )
})

test("getDaysFromDate returns 0 for March 1, Year 1", (t) => {
  const ymd = { year: 1, month: 0, day: 1 }
  const result = DateUtils.getDaysFromDate(ymd)
  t.is(result, 0)
})

test("getDaysFromDate returns 30 for April 1, Year 1", (t) => {
  const ymd = { year: 1, month: 1, day: 1 }
  const result = DateUtils.getDaysFromDate(ymd)
  t.is(result, 31)
})

test("getDaysFromDate returns 273 for October 1, Year 1", (t) => {
  const ymd = { year: 1, month: 7, day: 1 }
  const result = DateUtils.getDaysFromDate(ymd)
  t.is(result, 214)
})

test("getDaysFromDate returns 245 for March 1, Year 2", (t) => {
  const ymd = { year: 2, month: 0, day: 1 }
  const result = DateUtils.getDaysFromDate(ymd)
  t.is(result, 245)
})

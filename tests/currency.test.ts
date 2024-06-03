import test from "ava"
import Currency from "../src/utils/currency.js"
import Mock from "openrct2-mocks"

test("formatMoney returns the value as string if it is NaN", (t) => {
  const result = Currency.formatMoney(NaN)
  t.is(result, "NaN")
})

test("formatMoney returns the value as string if it is less than 1000", (t) => {
  const result = Currency.formatMoney(999)
  t.is(result, "999")
})

test("formatMoney formats the value with commas if it is greater than or equal to 1000", (t) => {
  const result = Currency.formatMoney(1000)
  t.is(result, "1,000")
})

test("formatMoney formats the value with custom separator if provided", (t) => {
  const result = Currency.formatMoney(1000000, ".")
  t.is(result, "1.000.000")
})

test("formatMoney includes negative sign for negative values", (t) => {
  const result = Currency.formatMoney(-1000)
  t.is(result, "-1,000")
})

test("formatMoney includes decimal part if present", (t) => {
  const result = Currency.formatMoney(1234.56)
  t.is(result, "1,234.56")
})

test("localise formats the value with 2 decimal places by default", (t) => {
  globalThis.context = Mock.context()
  const result = Currency.localise(1234.56)
  t.is(result, "{CURRENCY2DP=1234.56}")
})

test("localise formats the value without decimal places if twodp is false", (t) => {
  globalThis.context = Mock.context()
  const result = Currency.localise(1234.56, false)
  t.is(result, "{CURRENCY=1234.56}")
})

test("localise formats the negative value with 2 decimal places by default", (t) => {
  globalThis.context = Mock.context()
  const result = Currency.localise(-1000)
  t.is(result, "{CURRENCY2DP=-1000}")
})

test("localise formats the negative value without decimal places if twodp is false", (t) => {
  globalThis.context = Mock.context()
  const result = Currency.localise(-1000, false)
  t.is(result, "{CURRENCY=-1000}")
})

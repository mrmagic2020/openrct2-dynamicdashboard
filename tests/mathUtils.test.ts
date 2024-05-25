import test from "ava"
import MathUtils from "../src/utils/mathUtils.ts"

test("clamp returns the value itself if it is within the range", (t) => {
  const result = MathUtils.clamp(5, 0, 10)
  t.is(result, 5)
})

test("clamp returns the minimum value if the value is less than the minimum", (t) => {
  const result = MathUtils.clamp(-5, 0, 10)
  t.is(result, 0)
})

test("clamp returns the maximum value if the value is greater than the maximum", (t) => {
  const result = MathUtils.clamp(15, 0, 10)
  t.is(result, 10)
})

test("clamp returns the minimum value if the minimum and maximum values are the same", (t) => {
  const result = MathUtils.clamp(5, 10, 10)
  t.is(result, 10)
})

test("normalise returns the normalized value within the range", (t) => {
  const result = MathUtils.normalise(5, 0, 10)
  t.is(result, 0.5)
})

test("normalise returns 0 if the value is equal to the minimum", (t) => {
  const result = MathUtils.normalise(0, 0, 10)
  t.is(result, 0)
})

test("normalise returns 1 if the value is equal to the maximum", (t) => {
  const result = MathUtils.normalise(10, 0, 10)
  t.is(result, 1)
})

test("normalise returns the clamped value if the value is outside the range", (t) => {
  const result = MathUtils.normalise(15, 0, 10)
  t.is(result, 1)
})

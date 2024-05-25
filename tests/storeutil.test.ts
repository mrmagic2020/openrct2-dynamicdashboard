import test from "ava"
import { increment } from "../src/utils/storeutil.ts"
import { WritableStore, store } from "openrct2-flexui"

test("increment() adds 1 to the store value by default", (t) => {
  const numberStore: WritableStore<number> = store<number>(0)
  increment(numberStore)
  t.is(numberStore.get(), 1)
})

test("increment() adds the specified amount to the store value", (t) => {
  const numberStore: WritableStore<number> = store<number>(0)
  increment(numberStore, 5)
  t.is(numberStore.get(), 5)
})

test("increment() supports negative increments", (t) => {
  const numberStore: WritableStore<number> = store<number>(0)
  increment(numberStore, -5)
  t.is(numberStore.get(), -5)
})

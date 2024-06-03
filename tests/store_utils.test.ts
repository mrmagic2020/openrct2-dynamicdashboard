import test from "ava"
import { increment, push } from "../src/utils/store_utils.js"
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

test("push() adds a value to the store", (t) => {
  const arrayStore: WritableStore<number[]> = store<number[]>([])
  push(arrayStore, 5)
  t.deepEqual(arrayStore.get(), [5])
})

test("push() adds multiple values to the store", (t) => {
  const arrayStore: WritableStore<number[]> = store<number[]>([])
  push(arrayStore, 1)
  push(arrayStore, 2)
  push(arrayStore, 3)
  t.deepEqual(arrayStore.get(), [1, 2, 3])
})

test("push() supports different types of values", (t) => {
  const arrayStore: WritableStore<(string | number)[]> = store<
    (string | number)[]
  >([])
  push(arrayStore, "hello")
  push(arrayStore, 42)
  t.deepEqual(arrayStore.get(), ["hello", 42])
})

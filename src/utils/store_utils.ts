import { WritableStore } from "openrct2-flexui"

/**
 * Increments the value of a writable store by a specified amount.
 *
 * @param store - The writable store to increment.
 * @param val - The amount to increment the store value by. Defaults to 1.
 * @returns {void}
 */
function increment(store: WritableStore<number>, val: number = 1): void {
  store.set(store.get() + val)
}

/**
 * Pushes a value to the given store.
 *
 * @template T - The type of the value.
 * @param store - The store to push the value to.
 * @param val - The value to push.
 * @returns {void}
 */
function push<T>(store: WritableStore<T[]>, val: T): void {
  store.set([...store.get(), val])
}

export { increment, push }

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

export { increment }

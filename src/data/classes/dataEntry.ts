import { WritableStore } from "openrct2-flexui"
import HookManager from "../../utils/hooks"
/**
 * Represents a data entry with a key, optional temporary flag, default value, and a writable store.
 * @template T - The type of the data entry value.
 */
interface DataEntryParams<T> {
  /**
   * The key to store the data in the park storage.
   */
  key: string

  /**
   * Whether the data is temporary and should not be stored in the park storage.
   */
  temporary?: boolean

  /**
   * The default value of the data entry. Used when resetting the data.
   */
  default?: T

  /**
   * The writable store for the data entry.
   */
  store: WritableStore<T>
}

class DataEntry<T> {
  private _key: string
  private _temporary: boolean
  private _defaultValue: T | undefined
  private _store: WritableStore<T>

  /**
   * The key to store the data in the park storage.
   */
  get key() {
    return this._key
  }

  /**
   * Whether the data entry is temporary and should not be stored in the park storage.
   */
  get temporary() {
    return this._temporary
  }

  get default() {
    return this._defaultValue
  }

  get store() {
    return this._store
  }

  constructor(
    params:
      | DataEntryParams<T>
      | Omit<DataEntryParams<T>, "temporary" | "default">
  ) {
    this._key = params.key
    this._store = params.store
    if ("temporary" in params) this._temporary = params.temporary || false
    else this._temporary = false
    if ("default" in params) this._defaultValue = params.default

    HookManager.hook("map.changed", () => {
      this.reset()
    })
    this._store.subscribe((value: T) => {
      if (!this._temporary) {
        context.getParkStorage().set(this._key, value)
      }
    })
  }

  /**
   * Resets the data entry to its default value.
   */
  reset() {
    this._store.set(this._defaultValue || (0 as T))
  }

  /**
   * Erases the data entry from the park storage.
   */
  erase() {
    if (context.getParkStorage().has(this._key)) {
      context.getParkStorage().set(this._key, undefined)
    }
  }

  /**
   * Deletes the data entry by resetting its values and erasing it from the park storage.
   */
  delete() {
    this.reset()
    this.erase()
  }
}

export default DataEntry
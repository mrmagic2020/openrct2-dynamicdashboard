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
   * Whether the data entry is global and should be stored in the global storage.
   */
  global?: boolean

  /**
   * The writable store for the data entry.
   */
  store: WritableStore<T>
}

class DataEntry<T> {
  private _key: string
  private _temporary: boolean
  private _defaultValue: T | undefined
  private _global: boolean
  private _store: WritableStore<T>

  private init() {
    if (!this._temporary) {
      if (this.getConfig().has(this._key)) {
        this._store.set(
          (this.getConfig().get(this._key) as T) ?? (0 as unknown as T)
        )
      }
    }
  }

  private getConfig(): Configuration {
    return this._global ? context.sharedStorage : context.getParkStorage()
  }

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
    if ("global" in params) this._global = params.global || false
    else this._global = false
    if ("default" in params) this._defaultValue = params.default

    if (!this._global) {
      HookManager.hook("map.changed", () => {
        this.reset()
        this.init()
      })
    }
    this._store.subscribe((value: T) => {
      if (!this._temporary) {
        this.getConfig().set(this._key, value)
      }
    })

    this.init()
  }

  /**
   * Resets the data entry to its default value.
   */
  reset() {
    this._store.set(
      this._defaultValue ? this._defaultValue : (0 as unknown as T)
    )
  }

  /**
   * Erases the data entry from the park storage.
   */
  erase() {
    if (this.getConfig().has(this._key)) {
      this.getConfig().set(this._key, undefined)
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

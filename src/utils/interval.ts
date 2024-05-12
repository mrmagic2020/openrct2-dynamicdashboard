import { baseData } from "../data/main"
import { increment } from "./storeutil"

export interface FunctionInfo {
  ID: number
  func: Function
  interval: number
  paused: boolean
  pause_on_manual?: boolean
}

/**
 * Manages intervals for executing functions at specified intervals.
 */
export class IntervalManager {
  private intervalIDs: number[] = []
  private registered: FunctionInfo[] = []
  private paused: boolean = false
  private pausedOnManual: boolean = false

  private counterInitialised: boolean = false
  private counterID: number = -1

  private initCounter(): void {
    this.counterInitialised = true
    this.counterID = context.setInterval(() => {
      increment(baseData.local.options.countdown_progress.store)
      if (
        baseData.local.options.countdown_progress.store.get() >
        baseData.global.update_ratio.get()
      ) {
        baseData.local.options.countdown_progress.store.set(1)
      }
    }, 1 * 1000)
  }

  private clearCounter(): void {
    context.clearInterval(this.counterID)
    this.counterInitialised = false
    baseData.local.options.countdown_progress.store.set(0)
  }

  static init(): IntervalManager {
    const interval = new IntervalManager()
    return interval
  }

  constructor() {}

  /**
   * Registers a function to be executed at a specified interval.
   *
   * @param func The function to be executed.
   * @param interval The interval at which the function should be executed, in milliseconds. Defaults to the value of `baseData.global.update_ratio.get() * 1000`.
   * @param pause_on_manual Specifies whether the interval should be paused when the user manually pauses the execution. Defaults to `true`.
   * @returns The ID of the registered interval.
   */
  register(
    func: Function,
    interval: number = baseData.global.update_ratio.get() * 1000,
    pause_on_manual: boolean = true
  ): number {
    if (
      !this.counterInitialised &&
      interval === baseData.global.update_ratio.get() * 1000
    )
      this.initCounter()
    const ID = context.setInterval(func, interval)
    this.intervalIDs.push(ID)
    let info: FunctionInfo = {
      ID: ID,
      func: func,
      interval: interval,
      paused: false,
      pause_on_manual: pause_on_manual
    }
    this.registered.push(info)
    return ID
  }

  pauseManual(): void {
    if (this.pausedOnManual) return
    this.registered.forEach((f) => {
      if (f.pause_on_manual && !f.paused) {
        context.clearInterval(f.ID)
        f.paused = true
      }
    })
    this.pausedOnManual = true
  }

  /**
   * Pauses all intervals managed by the IntervalManager.
   */
  pauseAll(): void {
    if (this.paused) return
    this.registered.forEach((f) => {
      if (f.paused) return
      context.clearInterval(f.ID)
    })
    this.clearCounter()
    this.paused = true
  }

  /**
   * Resumes the execution of registered functions at their specified intervals.
   */
  resumeAll(): void {
    if (!this.paused) return
    this.registered.forEach((f) => {
      const id = context.setInterval(f.func, f.interval)
      f.ID = id
      this.intervalIDs.push(id)
    })
    this.initCounter()
    this.paused = false
  }

  /**
   * Clears the interval with the specified ID.
   * @param id The ID of the interval to be cleared.
   */
  clear(id: number): void {
    context.clearInterval(id)
  }

  /**
   * Clears all registered intervals.
   */
  clearAll(): void {
    this.intervalIDs.forEach((id) => {
      context.clearInterval(id)
    })
    this.counterInitialised = false
  }

  get isPaused(): boolean {
    return this.paused
  }

  get isPausedOnManual(): boolean {
    return this.pausedOnManual
  }
}

export default IntervalManager.init()

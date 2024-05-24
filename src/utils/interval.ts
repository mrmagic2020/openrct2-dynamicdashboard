import { WritableStore } from "openrct2-flexui"
import { increment } from "./storeutil"

export interface FunctionInfo {
  ID: number
  func: Function
  interval: number
  paused: boolean
  pause_on_manual?: boolean
}

export interface IntervalManagerInitParams {
  update_frequency: WritableStore<number>
  countdown_progress: WritableStore<number>
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

  private updateFrequency: WritableStore<number>
  private countdownProgress: WritableStore<number>

  initCounter(): void {
    if (this.counterInitialised) return
    this.counterInitialised = true
    this.counterID = context.setInterval(() => {
      increment(this.countdownProgress)
      if (this.countdownProgress.get() >= this.updateFrequency.get()) {
        this.countdownProgress.set(0)
      }
    }, 1 * 1000)
  }

  private clearCounter(): void {
    context.clearInterval(this.counterID)
    this.counterInitialised = false
    this.countdownProgress.set(0)
  }

  static init(params: IntervalManagerInitParams): IntervalManager {
    const interval = new IntervalManager(params)
    return interval
  }

  constructor(params: IntervalManagerInitParams) {
    this.updateFrequency = params.update_frequency
    this.countdownProgress = params.countdown_progress
  }

  /**
   * Registers a function to be executed at a specified interval.
   *
   * @param func The function to be executed.
   * @param interval The interval at which the function should be executed, in milliseconds. Defaults to the value of `baseData.global.update_frequency.get() * 1000`.
   * @param pause_on_manual Specifies whether the interval should be paused when the user manually pauses the execution. Defaults to `true`.
   * @returns The ID of the registered interval.
   */
  register(
    func: Function,
    interval: number = this.updateFrequency.get() * 1000,
    pause_on_manual: boolean = true
  ): number {
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

  syncCounter(): void {
    this.pauseAll()
    this.resumeAll()
  }

  /**
   * Returns whether the IntervalManager is paused.
   */
  get isPaused(): boolean {
    return this.paused
  }

  /**
   * Returns whether the IntervalManager is paused due to manual pausing.
   */
  get isPausedOnManual(): boolean {
    return this.pausedOnManual
  }

  /**
   * Returns the registered functions.
   */
  get registeredFunctions(): FunctionInfo[] {
    return this.registered
  }

  /**
   * Returns the IDs of the registered intervals.
   */
  get registeredIDs(): number[] {
    return this.intervalIDs
  }
}

export default IntervalManager

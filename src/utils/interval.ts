interface FunctionInfo {
  ID: number
  func: Function
  interval: number
  paused: boolean
  pause_on_manual?: boolean
}

/**
 * Manages intervals for executing functions at specified intervals.
 */
class IntervalManager {
  private intervalIDs: number[] = []
  private registered: FunctionInfo[] = []
  private paused: boolean = false
  private pausedOnManual: boolean = false

  static init(): IntervalManager {
    const interval = new IntervalManager()
    return interval
  }

  constructor() {}

  /**
   * Registers a function to be executed at the specified interval.
   * @param func The function to be executed.
   * @param interval The interval in milliseconds.
   * @param pause_on_manual Whether the interval should be paused when update status is set to MANUAL. Functions like game time updates should not be paused.
   * @returns The ID of the interval.
   */
  register(
    func: Function,
    interval: number,
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
    console.log(
      `Registered interval function ${func.toString()} with ID ${ID}.`
    )
    return ID
  }

  pauseManual(): void {
    if (this.pausedOnManual) return
    this.registered.forEach((f) => {
      if (f.pause_on_manual && !f.paused) {
        context.clearInterval(f.ID)
        console.log(
          `Paused interval function ${f.func.toString()} with ID ${f.ID}.`
        )
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
      console.log(
        `Paused interval function ${f.func.toString()} with ID ${f.ID}.`
      )
    })
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
  }

  get isPaused(): boolean {
    return this.paused
  }

  get isPausedOnManual(): boolean {
    return this.pausedOnManual
  }
}

export default IntervalManager.init()

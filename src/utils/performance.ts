class Performance {
  private _start: number
  private _end: number

  constructor() {
    this._start = 0
    this._end = 0
  }

  /**
   * Starts the performance measurement.
   */
  start() {
    this._start = performance.now()
  }

  /**
   * Ends the performance measurement and returns the duration in milliseconds.
   * @returns The duration in milliseconds.
   */
  end(): number {
    this._end = performance.now()
    const duration = this._end - this._start
    return duration
  }
}

export default Performance

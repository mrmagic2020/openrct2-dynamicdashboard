import Logger from "./logger"

class ActionValidator {
  private _lastActionTime: number
  private _lastActionData: string
  private readonly interval: number

  /**
   * Creates a new action validator.
   * @param interval - The interval in milliseconds to check for repeated actions.
   */
  constructor(interval: number) {
    this._lastActionTime = 0
    this._lastActionData = ""
    this.interval = interval
  }

  check(e: GameActionEventArgs): boolean {
    const currentTime = Date.now()
    const actionData = this.getActionData(e)
    if (
      this._lastActionData === actionData &&
      currentTime - this._lastActionTime < this.interval
    ) {
      return false
    }
    this._lastActionTime = currentTime
    this._lastActionData = actionData
    Logger.debug(`Detected valid action: ${actionData}`)
    return true
  }

  private getActionData(e: GameActionEventArgs): string {
    return JSON.stringify({
      player: e.player,
      type: e.type,
      action: e.action,
      args: e.args
    })
  }
}

export default ActionValidator

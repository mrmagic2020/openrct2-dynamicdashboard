namespace Options {
  export namespace UpdateStatus {
    export const RUNNING = 0
    export const MANUAL = 1
    export const PAUSED = 2
    export function next(status: number) {
      return (status + 1) % 3
    }
  }
}

export default Options

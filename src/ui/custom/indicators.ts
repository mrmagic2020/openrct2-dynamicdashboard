import {
  WidgetCreator,
  FlexiblePosition,
  button,
  compute
} from "openrct2-flexui"
import Data from "../../data"
import { baseData } from "../../data/main"
import Sprites from "./sprites"

let manualIndicatorLit: boolean = false

function toggleManualIndicatorLit(status: boolean): void {
  manualIndicatorLit = status
}

/**
 * Creates an indicator widget based on the provided position.
 * @param pos The position of the indicator.
 * @returns A widget creator function that creates the indicator widget.
 */
function createIndicator(pos: number): WidgetCreator<FlexiblePosition> {
  return button({
    height: "20px",
    image: compute(
      baseData.local.options.update_status.store,
      baseData.local.options.countdown_progress.store,
      (v1, v2) => {
        switch (v1) {
          case Data.Options.UpdateStatus.RUNNING:
            if (pos <= v2 * (10 / baseData.global.update_frequency.get()))
              return Sprites.INDICATOR_RUNNING_LIT
            return Sprites.INDICATOR_RUNNING_UNLIT
          case Data.Options.UpdateStatus.MANUAL:
            return manualIndicatorLit
              ? Sprites.INDICATOR_MANUAL_LIT
              : Sprites.INDICATOR_MANUAL_UNLIT
          case Data.Options.UpdateStatus.PAUSED:
            return Sprites.INDICATOR_PAUSED_LIT
          default:
            return -1
        }
      }
    )
  })
}

const Indicators: WidgetCreator<FlexiblePosition>[] = [
  createIndicator(1),
  createIndicator(2),
  createIndicator(3),
  createIndicator(4),
  createIndicator(5),
  createIndicator(6),
  createIndicator(7),
  createIndicator(8),
  createIndicator(9),
  createIndicator(10)
]

export { Indicators, toggleManualIndicatorLit }

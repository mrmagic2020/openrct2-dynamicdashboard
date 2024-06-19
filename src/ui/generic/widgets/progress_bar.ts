import {
  Bindable,
  Colour,
  ElementParams,
  FlexiblePosition,
  WidgetCreator,
  graphics,
  read
} from "openrct2-flexui"

interface ProgressBarParams extends ElementParams {
  /**
   * The background colour of the progress bar.
   */
  background: Bindable<Colour>

  /**
   * The foreground colour of the progress bar.
   */
  foreground: Bindable<Colour>

  /**
   * The percentage of the progress bar that is filled.
   */
  percentFilled: Bindable<number>
}

function progressBar(
  params: ProgressBarParams & FlexiblePosition
): WidgetCreator<FlexiblePosition> {
  return graphics({
    width: params.width ?? "1w",
    height: params.height ?? 14,
    visibility: params.visibility || "visible",
    disabled: params.disabled,
    onDraw: (g) => {
      const background: Colour = read(params.background)
      const foreground: Colour = read(params.foreground)
      const percentFilled = read(params.percentFilled)
      const disabled = read(params.disabled)

      g.colour = background
      g.well(0, 0, g.width, g.height)
      if (!disabled) {
        g.colour = foreground
        g.box(1, 1, g.width * percentFilled - 2, g.height - 2)
      } else {
        g.box(1, 1, g.width - 2, g.height - 2)
      }
    }
  })
}

export { type ProgressBarParams, progressBar }

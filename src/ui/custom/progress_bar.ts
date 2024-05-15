import {
  Bindable,
  Colour,
  ElementParams,
  FlexiblePosition,
  WidgetCreator,
  graphics,
  isStore
} from "openrct2-flexui"

interface ProgressBarParams extends ElementParams {
  background: Bindable<Colour>
  foreground: Bindable<Colour>
  percentFilled: Bindable<number>
}

function progressBar(
  params: ProgressBarParams & FlexiblePosition
): WidgetCreator<FlexiblePosition> {
  return graphics({
    width: params.width ?? "1w",
    height: params.height ?? 14,
    visibility: params.visibility || "visible",
    onDraw: (g) => {
      const background: Colour = isStore(params.background)
        ? params.background.get()
        : params.background
      const foreground: Colour = isStore(params.foreground)
        ? params.foreground.get()
        : params.foreground
      const percentFilled = isStore(params.percentFilled)
        ? params.percentFilled.get()
        : params.percentFilled

      g.colour = background
      g.well(0, 0, g.width, g.height)
      g.colour = foreground
      g.box(1, 1, g.width * percentFilled - 2, g.height - 2)
    }
  })
}

export { type ProgressBarParams, progressBar }

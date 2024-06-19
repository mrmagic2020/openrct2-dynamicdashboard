import {
  Bindable,
  Colour,
  ElementParams,
  FlexiblePosition,
  WidgetCreator,
  graphics,
  read
} from "openrct2-flexui"

interface BoxChartParams extends ElementParams {
  /**
   * The first quartile of the box chart.
   */
  q1: Bindable<number>
  /**
   * The third quartile of the box chart.
   */
  q3: Bindable<number>
  /**
   * The median of the box chart.
   */
  median: Bindable<number>
  /**
   * The low whisker of the box chart.
   */
  whiskerLow: Bindable<number>
  /**
   * The high whisker of the box chart.
   */
  whiskerHigh: Bindable<number>

  /**
   * The range of the box chart.
   */
  range: Bindable<number>

  background?: Bindable<Colour>

  /**
   * The colour of the stroke.
   */
  stroke?: Bindable<number>
}

function boxChart(
  params: BoxChartParams & FlexiblePosition
): WidgetCreator<FlexiblePosition> {
  return graphics({
    width: params.width ?? "1w",
    height: params.height ?? 100,
    visibility: params.visibility || "visible",
    disabled: params.disabled,
    onDraw: (g) => {
      const q1 = read(params.q1)
      const q3 = read(params.q3)
      const median = read(params.median)
      const whiskerLow = read(params.whiskerLow)
      const whiskerHigh = read(params.whiskerHigh)
      // const disabled = read(params.disabled)

      const range = read(params.range)
      const width = g.width * 0.9
      const hOffset = g.width * 0.05
      const height = g.height * 0.95
      const vOffset = g.height * 0.025 // offset the graph towards the top to make space for labels

      // Draw the well containing the box chart.
      g.colour = read(params.background)
      g.well(0, 0, g.width, g.height)

      /**
       * Draw the chart from left to right.
       */
      g.stroke = read(params.stroke) || 1

      // Draw the low whisker.
      g.line(
        width * (whiskerLow / range) + hOffset,
        height * 0.25 - vOffset,
        width * (whiskerLow / range) + hOffset,
        height * 0.75 - vOffset
      )

      // Text for the low whisker.
      g.text(
        whiskerLow.toString(),
        width * (whiskerLow / range) + hOffset,
        height * 0.75 + vOffset
      )

      // Draw the line from the low whisker to the first quartile.
      g.line(
        width * (whiskerLow / range) + hOffset,
        height / 2 - vOffset,
        width * (q1 / range) + hOffset,
        height / 2 - vOffset
      )

      // Draw the box.
      g.rect(
        width * (q1 / range) + hOffset,
        height * 0.25 - vOffset,
        width * ((q3 - q1) / range),
        height * 0.5
      )

      // Text for the first quartile.
      g.text(
        q1.toString(),
        width * (q1 / range) + hOffset,
        height * 0.75 + vOffset
      )

      // Text for the third quartile.
      g.text(
        q3.toString(),
        width * (q3 / range) + hOffset,
        height * 0.75 + vOffset
      )

      // Draw the median.
      g.line(
        width * (median / range) + hOffset,
        height * 0.25 - vOffset,
        width * (median / range) + hOffset,
        height * 0.75 - vOffset
      )

      // Text for the median.
      g.text(
        median.toString(),
        width * (median / range) + hOffset,
        height * 0.75 + vOffset
      )

      // Draw the line from the third quartile to the high whisker.
      g.line(
        width * (q3 / range) + hOffset,
        height / 2 - vOffset,
        width * (whiskerHigh / range) + hOffset,
        height / 2 - vOffset
      )

      // Draw the high whisker.
      g.line(
        width * (whiskerHigh / range) + hOffset,
        height * 0.25 - vOffset,
        width * (whiskerHigh / range) + hOffset,
        height * 0.75 - vOffset
      )

      // Text for the high whisker.
      g.text(
        whiskerHigh.toString(),
        width * (whiskerHigh / range) + hOffset,
        height * 0.75 + vOffset
      )
    }
  })
}

export { type BoxChartParams, boxChart }

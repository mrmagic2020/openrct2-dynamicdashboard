import {
  Bindable,
  WindowTemplate,
  label,
  listview,
  read,
  window
} from "openrct2-flexui"
import StatisticalAnalysis from "../../../utils/statistical_analysis"
import { boxChart } from "../graphs/box_chart"
import { baseData } from "../../../data/main"
import { language } from "../../../languages/lang"

interface GraphWindowParams {
  id: string
  title: Bindable<string>
  statistics: Bindable<StatisticalAnalysis>
  boxChartRange: Bindable<number>
}

class GraphWindow {
  private _window: WindowTemplate
  private static readonly openWindows: {
    [id: string]: GraphWindow
  } = {}

  constructor(params: GraphWindowParams) {
    if (typeof GraphWindow.openWindows[params.id] !== "undefined") {
      this._window = GraphWindow.openWindows[params.id]._window
      return
    }
    GraphWindow.openWindows[params.id] = this
    this._window = window({
      title: params.title,
      width: 800,
      height: 200,
      colours: [
        baseData.global.colour_scheme.primary.store.get(),
        baseData.global.colour_scheme.secondary.store.get()
      ],
      content: [
        listview({
          height: 26,
          columns: [
            {
              header: language.ui.generic.statistical_analysis.min
            },
            {
              header: language.ui.generic.statistical_analysis.q1
            },
            {
              header: language.ui.generic.statistical_analysis.median
            },
            {
              header: language.ui.generic.statistical_analysis.q3
            },
            {
              header: language.ui.generic.statistical_analysis.max
            },
            {
              header: language.ui.generic.statistical_analysis.mean
            },
            {
              header: language.ui.generic.statistical_analysis.mode
            },
            {
              header: language.ui.generic.statistical_analysis.range
            },
            {
              header: language.ui.generic.statistical_analysis.variance
            },
            {
              header:
                language.ui.generic.statistical_analysis.standard_deviation,
              width: 120
            }
          ],
          items: [
            [
              read(params.statistics).min,
              read(params.statistics).q1,
              read(params.statistics).median,
              read(params.statistics).q3,
              read(params.statistics).max,
              read(params.statistics).mean,
              read(params.statistics).mode,
              read(params.statistics).range,
              read(params.statistics).variance,
              read(params.statistics).standardDeviation
            ].map((item) => item.toString())
          ],
          scrollbars: "none"
        }),
        label({
          text: language.ui.generic.statistical_analysis.box_chart
        }),
        boxChart({
          q1: read(params.statistics).q1,
          q3: read(params.statistics).q3,
          median: read(params.statistics).median,
          whiskerLow: read(params.statistics).min,
          whiskerHigh: read(params.statistics).max,
          range: params.boxChartRange,
          background: baseData.global.colour_scheme.secondary.store.get()
        })
      ],
      onClose: () => {
        delete GraphWindow.openWindows[params.id]
      }
    })
  }

  static show(params: GraphWindowParams): GraphWindow {
    const window = new GraphWindow(params)
    window._window.open()
    return window
  }
}

export default GraphWindow

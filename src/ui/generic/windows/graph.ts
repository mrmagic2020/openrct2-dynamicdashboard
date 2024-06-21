import { Bindable, WindowParams, label, listview, read } from "openrct2-flexui"
import StatisticalAnalysis from "../../../utils/statistical_analysis"
import { boxPlot } from "../graphs/box_plot"
import { baseData } from "../../../data/main"
import { language } from "../../../languages/lang"
import Window from "./window"

interface GraphWindowParams {
  id: string
  title: Bindable<string>
  statistics: Bindable<StatisticalAnalysis>
  boxChartRange: Bindable<number>
}

class GraphWindow extends Window<WindowParams> {
  private static _openWindows: {
    [id: string]: GraphWindow
  } = {}

  private _id: string

  constructor(params: GraphWindowParams) {
    super({
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
          text: language.ui.generic.statistical_analysis.box_plot
        }),
        boxPlot({
          q1: read(params.statistics).q1,
          q3: read(params.statistics).q3,
          median: read(params.statistics).median,
          whiskerLow: read(params.statistics).min,
          whiskerHigh: read(params.statistics).max,
          range: params.boxChartRange,
          background: baseData.global.colour_scheme.secondary.store
        })
      ],
      onClose: () => {
        delete GraphWindow._openWindows[params.id]
      }
    })
    this._id = params.id
    if (GraphWindow._openWindows.hasOwnProperty(params.id)) {
      return GraphWindow._openWindows[params.id]
    }
    GraphWindow._openWindows[params.id] = this

    baseData.global.colour_scheme.primary.store.subscribe((colour) => {
      if (typeof this._windowParams.colours !== "undefined") {
        this._windowParams.colours[0] = colour
        this.redefine()
      }
    })
    baseData.global.colour_scheme.secondary.store.subscribe((colour) => {
      if (typeof this._windowParams.colours !== "undefined") {
        this._windowParams.colours[1] = colour
        this.redefine()
      }
    })
  }

  override close() {
    super.close()
    delete GraphWindow._openWindows[this._id]
  }
}

// class GraphWindow {
//   private _window: WindowTemplate
//   private static readonly openWindows: {
//     [id: string]: GraphWindow
//   } = {}

//   constructor(params: GraphWindowParams) {
//     if (typeof GraphWindow.openWindows[params.id] !== "undefined") {
//       this._window = GraphWindow.openWindows[params.id]._window
//       return
//     }
//     GraphWindow.openWindows[params.id] = this
//     this._window = window({
//       title: params.title,
//       width: 800,
//       height: 200,
//       colours: [
//         baseData.global.colour_scheme.primary.store.get(),
//         baseData.global.colour_scheme.secondary.store.get()
//       ],
//       content: [
//         listview({
//           height: 26,
//           columns: [
//             {
//               header: language.ui.generic.statistical_analysis.min
//             },
//             {
//               header: language.ui.generic.statistical_analysis.q1
//             },
//             {
//               header: language.ui.generic.statistical_analysis.median
//             },
//             {
//               header: language.ui.generic.statistical_analysis.q3
//             },
//             {
//               header: language.ui.generic.statistical_analysis.max
//             },
//             {
//               header: language.ui.generic.statistical_analysis.mean
//             },
//             {
//               header: language.ui.generic.statistical_analysis.mode
//             },
//             {
//               header: language.ui.generic.statistical_analysis.range
//             },
//             {
//               header: language.ui.generic.statistical_analysis.variance
//             },
//             {
//               header:
//                 language.ui.generic.statistical_analysis.standard_deviation,
//               width: 120
//             }
//           ],
//           items: [
//             [
//               read(params.statistics).min,
//               read(params.statistics).q1,
//               read(params.statistics).median,
//               read(params.statistics).q3,
//               read(params.statistics).max,
//               read(params.statistics).mean,
//               read(params.statistics).mode,
//               read(params.statistics).range,
//               read(params.statistics).variance,
//               read(params.statistics).standardDeviation
//             ].map((item) => item.toString())
//           ],
//           scrollbars: "none"
//         }),
//         label({
//           text: language.ui.generic.statistical_analysis.box_plot
//         }),
//         boxPlot({
//           q1: read(params.statistics).q1,
//           q3: read(params.statistics).q3,
//           median: read(params.statistics).median,
//           whiskerLow: read(params.statistics).min,
//           whiskerHigh: read(params.statistics).max,
//           range: params.boxChartRange,
//           background: baseData.global.colour_scheme.secondary.store.get()
//         })
//       ],
//       onClose: () => {
//         delete GraphWindow.openWindows[params.id]
//       }
//     })
//   }

//   static show(params: GraphWindowParams): GraphWindow {
//     const window = new GraphWindow(params)
//     window._window.open()
//     return window
//   }
// }

export default GraphWindow

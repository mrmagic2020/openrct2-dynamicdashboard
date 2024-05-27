import { baseData } from "../data/main"
import Logger from "../utils/logger"

namespace Exporter {
  export function exportData<T>(key?: RequestKey): T | undefined {
    if (key) {
      const request = processKey(key)
      switch (request.class) {
        case "base":
          return exportBaseData<T>(request) as T
        case "branch":
          return exportBranchData<T>(request) as T
      }
    } else {
      // to be implemented
      return undefined
    }
  }

  function exportBaseData<T>(request: RequestDataInfo): T | undefined {
    if (request.scope === "global") {
      // to be implemented
      return undefined
    } else {
      switch (request.type) {
        case "player":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as PlayerDataType
            ].store.get() as T
          }
          return undefined
        case "park_and_scenario":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as ParkAndScenarioDataType
            ].store.get() as T
          }
          return undefined
        case "stalls_and_facilities":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as StallsAndFacilitiesDataType
            ].store.get() as T
          }
          return undefined
        case "rides":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as RidesDataType
            ].store.get() as T
          }
          return undefined
        case "guest":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as GuestDataType
            ].store.get() as T
          }
          return undefined
        case "finance":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as FinanceDataType
            ].store.get() as T
          }
          return undefined
        case "options":
          if (
            baseData[request.scope][request.type].hasOwnProperty(request.key)
          ) {
            return baseData[request.scope][request.type][
              request.key as OptionsDataType
            ].store.get() as T
          }
          return undefined
        default:
          return undefined
      }
    }
  }

  function exportBranchData<T>(_request: RequestDataInfo): T | undefined {
    return undefined
  }

  export function validateKey(key: string): boolean {
    const keyPattern =
      /^(base|branch)\.(global|local)\.(player|park_and_scenario|stalls_and_facilities|rides|guest|finance|options)\..*$/
    return keyPattern.test(key)
  }

  export function processKey(key: RequestKey): RequestDataInfo {
    const [dataClass, dataScope, dataType, dataKey] = key.split(".")
    Logger.debug(
      `dataClass: ${dataClass}, dataScope: ${dataScope}, dataType: ${dataType}, key: ${dataKey}`
    )
    return {
      class: dataClass as DataClass,
      scope: dataScope as DataScope,
      type: dataType as DataType,
      key: dataKey as DataKey
    }
  }
}

export default Exporter

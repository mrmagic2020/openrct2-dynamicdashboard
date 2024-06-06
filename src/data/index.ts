import { GuestData as GD } from "./guest"
import { deleteAll, initData, interval } from "./main"
import { ParkAndScenarioData as PASD } from "./park_and_scenario"
import { PlayerData as PD } from "./player"
import { RideData as RD } from "./rides"
import { SFData as SAFD } from "./stalls_and_facilities"
import { Options as OPT } from "./options"
import { FinanceData } from "./finance"
import Cleanup from "./cleanup"
import HookManager from "../utils/hooks"
import Performance from "../utils/performance"
import Logger from "../utils/logger"

namespace Data {
  export import GuestData = GD
  export import ParkAndScenarioData = PASD
  export import PlayerData = PD
  export import RideData = RD
  export import SFData = SAFD
  export import Options = OPT

  export function updateAll(): void {
    const _peformance = new Performance()
    _peformance.start()
    PlayerData.update()
    GuestData.update()
    ParkAndScenarioData.update()
    SFData.update()
    RideData.update()
    FinanceData.update()
    Logger.debug(`Data updated in ${_peformance.end()}ms`)
  }

  export function init() {
    HookManager.hook("map.changed", Cleanup.execute)
    initData()
    PlayerData.init()
    GuestData.init()
    ParkAndScenarioData.init()
    SFData.init()
    RideData.init()
    FinanceData.init()
    interval.resumeAll()
  }

  export function reset(): void {
    deleteAll()
  }
}

export default Data

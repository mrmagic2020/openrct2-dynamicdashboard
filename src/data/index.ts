import { GuestData as GD } from "./guest"
import { deleteAll, initData, interval } from "./main"
import { ParkAndScenarioData as PASD } from "./park_and_scenario"
import { PlayerData as PD } from "./player"
import { RideData as RD } from "./rides"
import { SFData as SAFD } from "./stalls_and_facilities"
import { Options as OPT } from "./options"
import { FinanceData } from "./finance"

namespace Data {
  export import GuestData = GD
  export import ParkAndScenarioData = PASD
  export import PlayerData = PD
  export import RideData = RD
  export import SFData = SAFD
  export import Options = OPT

  export function updateAll(): void {
    PlayerData.update()
    GuestData.update()
    ParkAndScenarioData.update()
    SFData.update()
    RideData.update()
    FinanceData.update()
  }

  export function init() {
    initData()
    PlayerData.init()
    GuestData.init()
    ParkAndScenarioData.init()
    SFData.init()
    RideData.init()
    FinanceData.init()
    interval.resumeAll()
    // interval.initCounter()
  }

  export function reset(): void {
    deleteAll()
  }
}

export default Data

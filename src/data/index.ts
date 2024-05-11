import { GuestData as GD } from "./guest"
import { initData } from "./main"
import { ParkAndScenarioData as PASD } from "./park_and_scenario"
import { PlayerData as PD } from "./player"
import { RideData as RD } from "./rides"
import { StallsAndFacilitiesData as SAFD } from "./stalls_and_facilities"

namespace Data {
  export import GuestData = GD
  export import ParkAndScenarioData = PASD
  export import PlayerData = PD
  export import RideData = RD
  export import StallsAndFacilitiesData = SAFD

  export function updateAll(): void {
    PlayerData.update()
    GuestData.update()
    ParkAndScenarioData.update()
    StallsAndFacilitiesData.update()
    RideData.update()
  }

  export function init() {
    initData()
    PlayerData.init()
    GuestData.init()
    ParkAndScenarioData.init()
    StallsAndFacilitiesData.init()
    RideData.init()
  }
}

export default Data

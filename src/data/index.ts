import { GuestData } from "./guest"
import { ParkAndScenarioData } from "./park_and_scenario"
import { PlayerData } from "./player"
import { RideData } from "./rides"
import { StallsAndFacilitiesData } from "./stalls_and_facilities"

namespace Data {
  export function updateAll(): void {
    PlayerData.update()
    GuestData.update()
    ParkAndScenarioData.update()
    StallsAndFacilitiesData.update()
    RideData.update()
  }
}

export default Data

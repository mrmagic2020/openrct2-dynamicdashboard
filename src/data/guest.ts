import { baseData, branchData } from "./main"
import { increment } from "../utils/storeUtils"
import { interval } from "../data/main"
import HookManager from "../utils/hooks"

namespace GuestData {
  export const MAX_HAPPINESS = 255
  /**
   * Max energy is, unlike all other stats, capped at 128.
   * @see {@link https://github.com/OpenRCT2/OpenRCT2/blob/14828e441678485cc7582651ce2f9a63869c1e93/src/openrct2/entity/Peep.h#L24}
   */
  export const MAX_ENERGY = 128
  export const MAX_NAUSEA = 255
  export const MAX_HUNGER = 255
  export const MAX_THIRST = 255
  export const MAX_TOILET = 255

  /**
   * The thresholds for the guest stats that trigger a warning.
   * @see {@link https://github.com/OpenRCT2/OpenRCT2/blob/14828e441678485cc7582651ce2f9a63869c1e93/src/openrct2-ui/windows/Guest.cpp#L1096-L1149}
   */
  export const HAPINESS_WARNING_THRESHOLD = 50
  export const ENERGY_WARNING_THRESHOLD = 50
  export const NAUSEA_WARNING_THRESHOLD = 120
  export const HUNGER_WARNING_THRESHOLD = 170
  export const THIRST_WARNING_THRESHOLD = 170
  export const TOILET_WARNING_THRESHOLD = 160

  /**
   * Updates the guest generation count based on the provided arguments.
   * If the interval is paused or the guest ID is not provided, the function returns early.
   * Otherwise, it increments the guest generation total.
   *
   * @param e - The arguments for the guest generation.
   */
  function updateGuestGenerationCount(e: GuestGenerationArgs): void {
    if (interval.isPaused) return
    if (e.id) {
      increment(baseData.local.guest.guest_generation_total.store)
    }
  }

  function updateGuestAdmissionCount(): void {
    baseData.local.guest.guest_admission_total.store.set(park.totalAdmissions)
  }

  function updateCurrentGuestCount(guests: Guest[]): void {
    baseData.local.guest.guest_count_current.store.set(
      guests.filter((guest) => guest.isInPark).length
    )
  }

  function updateGuestSoftCap(): void {
    baseData.local.guest.guest_soft_cap.store.set(park.suggestedGuestMaximum)
  }

  function updateGuestProfile(guests: Guest[]): void {
    let weightSum = 0,
      wealthSum = 0,
      happinessSum = 0,
      energySum = 0,
      nauseaSum = 0,
      hungerSum = 0,
      thirstSum = 0,
      toiletSum = 0
    guests.forEach((guest) => {
      weightSum += guest.mass
      wealthSum += guest.cash
      happinessSum += guest.happiness
      energySum += guest.energy
      nauseaSum += guest.nausea
      hungerSum += guest.hunger
      thirstSum += guest.thirst
      toiletSum += guest.toilet
    })
    branchData.local.guest.guest_weight_ave_sum.store.set(weightSum)
    branchData.local.guest.guest_wealth_ave_sum.store.set(wealthSum)
    branchData.local.guest.guest_happiness_ave_sum.store.set(happinessSum)
    branchData.local.guest.guest_energy_ave_sum.store.set(energySum)
    branchData.local.guest.guest_nausea_ave_sum.store.set(nauseaSum)
    branchData.local.guest.guest_hunger_ave_sum.store.set(hungerSum)
    branchData.local.guest.guest_thirst_ave_sum.store.set(thirstSum)
    branchData.local.guest.guest_toilet_ave_sum.store.set(toiletSum)
  }

  export function update(): void {
    const guests = map.getAllEntities("guest")
    updateGuestAdmissionCount()
    updateCurrentGuestCount(guests)
    updateGuestSoftCap()
    updateGuestProfile(guests)
  }

  /**
   * Initialize guest data.
   */
  export function init(): void {
    HookManager.hook("guest.generation", updateGuestGenerationCount)
    interval.register(() => {
      update()
    }, baseData.global.update_frequency.get() * 1000)
  }
}

export { GuestData }

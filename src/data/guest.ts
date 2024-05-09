import { baseData, branchData } from "./main"
import { increment } from "../storeutil"

function updateGuestGenerationCount(e: GuestGenerationArgs): void {
  if (e.id) {
    increment(baseData.local.guest.guest_generation_total.store)
  }
}

function updateGuestAdmissionCount(): void {
  baseData.local.guest.guest_admission_total.store.set(park.totalAdmissions)
}

function updateCurrentGuestCount(): void {
  baseData.local.guest.guest_count_current.store.set(
    map.getAllEntities("guest").length
  )
}

function updateGuestSoftCap(): void {
  baseData.local.guest.guest_soft_cap.store.set(park.suggestedGuestMaximum)
}

function updateGuestProfile(): void {
  let weightSum = 0,
    wealthSum = 0,
    happinessSum = 0,
    energySum = 0,
    nauseaSum = 0,
    hungerSum = 0,
    thirstSum = 0,
    toiletSum = 0
  map.getAllEntities("guest").forEach((guest) => {
    weightSum += guest.mass
    wealthSum += guest.cash
    happinessSum += guest.happiness
    energySum += guest.energy
    nauseaSum += guest.nausea
    hungerSum += guest.hunger
    thirstSum += guest.thirst
    toiletSum += guest.toilet
  })
  branchData.local.guest.guest_weight_ave_sum[0].store.set(weightSum)
  branchData.local.guest.guest_wealth_ave_sum[0].store.set(wealthSum / 10)
  branchData.local.guest.guest_happiness_ave_sum[0].store.set(happinessSum)
  branchData.local.guest.guest_energy_ave_sum[0].store.set(energySum)
  branchData.local.guest.guest_nausea_ave_sum[0].store.set(nauseaSum)
  branchData.local.guest.guest_hunger_ave_sum[0].store.set(hungerSum)
  branchData.local.guest.guest_thirst_ave_sum[0].store.set(thirstSum)
  branchData.local.guest.guest_toilet_ave_sum[0].store.set(toiletSum)
}

/**
 * Initialize guest data.
 */
function initGuestData(): void {
  context.subscribe("guest.generation", updateGuestGenerationCount)
  context.setInterval(() => {
    updateGuestAdmissionCount()
    updateCurrentGuestCount()
    updateGuestSoftCap()
    updateGuestProfile()
  }, baseData.global.update_ratio.get() * 1000)
}

export { initGuestData }

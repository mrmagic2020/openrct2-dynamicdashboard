import { baseData, branchData } from "./main";

/**
 * Initialize guest data.
 * 
 * @return {void}
 */
function initGuestData(): void {
  /**
   * Update the total number of guests generated.
   */
  context.subscribe("guest.generation", (e) => {
    if (e.id) {
      baseData.local.guest.guest_generation_total.store.set(baseData.local.guest.guest_generation_total.store.get() + 1);
      // console.log("guest generated");
    }
  });

  context.setInterval(() => {
    // Update total guest admission.
    baseData.local.guest.guest_admission_total.store.set(park.totalAdmissions);

    // Update current guest count.
    baseData.local.guest.guest_count_current.store.set(map.getAllEntities("guest").length);

    // Update guest soft cap.
    baseData.local.guest.guest_soft_cap.store.set(park.suggestedGuestMaximum);

    // Update guest weight, wealth, happiness, energy, nausea, hunger, thirst and toilet average.
    let weightSum = 0, wealthSum = 0, happinessSum = 0, energySum = 0, nauseaSum = 0, hungerSum = 0, thirstSum = 0, toiletSum = 0;
    // console.log("Guest wealth sample count 2: " + map.getAllEntities("guest").length);
    map.getAllEntities("guest").forEach(guest => {
      weightSum += guest.mass;
      wealthSum += guest.cash;
      happinessSum += guest.happiness;
      energySum += guest.energy;
      nauseaSum += guest.nausea;
      hungerSum += guest.hunger;
      thirstSum += guest.thirst;
      toiletSum += guest.toilet;
    });
    branchData.local.guest.guest_weight_ave_sum[0].store.set(weightSum);
    branchData.local.guest.guest_wealth_ave_sum[0].store.set(wealthSum / 10);
    branchData.local.guest.guest_happiness_ave_sum[0].store.set(happinessSum);
    branchData.local.guest.guest_energy_ave_sum[0].store.set(energySum);
    branchData.local.guest.guest_nausea_ave_sum[0].store.set(nauseaSum);
    branchData.local.guest.guest_hunger_ave_sum[0].store.set(hungerSum);
    branchData.local.guest.guest_thirst_ave_sum[0].store.set(thirstSum);
    branchData.local.guest.guest_toilet_ave_sum[0].store.set(toiletSum);
  }, baseData.global.update_ratio.get() * 1000)
}

export { initGuestData };

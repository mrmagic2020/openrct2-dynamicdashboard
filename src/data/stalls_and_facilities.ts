import { interval } from "../data/main"
import { baseData } from "./main"

namespace SFData {
  interface SFList {
    stalls: Ride[]
    facilities: Ride[]
  }

  /**
   * Represents the available shop items.
   * @see {@link https://github.com/OpenRCT2/OpenRCT2/blob/919cef7f559fe30939ae8c47b5086cc071709847/src/openrct2/ride/ShopItem.h#L20~L75 | ShopItem.h}
   */
  export enum ShopItem {
    Balloon,
    Toy,
    Map,
    Photo,
    Umbrella,
    Drink,
    Burger,
    Chips,
    IceCream,
    Candyfloss,
    EmptyCan,
    Rubbish,
    EmptyBurgerBox,
    Pizza,
    Voucher,
    Popcorn,
    HotDog,
    Tentacle,
    Hat,
    ToffeeApple,
    TShirt,
    Doughnut,
    Coffee,
    EmptyCup,
    Chicken,
    Lemonade,
    EmptyBox,
    EmptyBottle = 27,
    Admission = 31,
    Photo2 = 32,
    Photo3,
    Photo4,
    Pretzel,
    Chocolate,
    IcedTea,
    FunnelCake,
    Sunglasses,
    BeefNoodles,
    FriedRiceNoodles,
    WontonSoup,
    MeatballSoup,
    FruitJuice,
    SoybeanMilk,
    Sujeonggwa,
    SubSandwich,
    Cookie,
    EmptyBowlRed,
    EmptyDrinkCarton,
    EmptyJuiceCup,
    RoastSausage,
    EmptyBowlBlue,
    Count = 56,
    None = 255
  }

  /**
   * Retrieves a list of stalls and facilities from the map.
   *
   * @returns An object containing two arrays: `stalls` and `facilities`.
   */
  function getList(): SFList {
    const rides = map.rides
    const stalls: Ride[] = []
    const facilities: Ride[] = []

    rides.forEach((ride) => {
      if (ride.classification === "stall") stalls.push(ride)
      else if (ride.classification === "facility") facilities.push(ride)
    })

    return { stalls, facilities }
  }

  /**
   * Updates the count of stalls and facilities.
   */
  function updateSFCount(): void {
    const list = getList()
    baseData.local.stalls_and_facilities.stalls_and_facilities_count_total.store.set(
      list.facilities.length + list.stalls.length
    )
    baseData.local.stalls_and_facilities.stalls_count_total.store.set(
      list.stalls.length
    )
    baseData.local.stalls_and_facilities.facilities_count_total.store.set(
      list.facilities.length
    )
  }

  export function update(): void {
    updateSFCount()
  }

  export function init(): void {
    interval.register(
      updateSFCount,
      baseData.global.update_frequency.get() * 1000
    )
  }
}

export { SFData }

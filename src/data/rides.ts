import { baseData, branchData } from "./main"

/**
 * List of ride type IDs.
 * Used for identifying the type of a ride.
 *
 * Extracted from {@link https://github.com/OpenRCT2/OpenRCT2/blob/develop/src/openrct2/ride/Ride.h OpenRCT2 source code}.
 */
enum RideType {
  RIDE_TYPE_SPIRAL_ROLLER_COASTER = 0,
  RIDE_TYPE_STAND_UP_ROLLER_COASTER,
  RIDE_TYPE_SUSPENDED_SWINGING_COASTER,
  RIDE_TYPE_INVERTED_ROLLER_COASTER,
  RIDE_TYPE_JUNIOR_ROLLER_COASTER,
  RIDE_TYPE_MINIATURE_RAILWAY,
  RIDE_TYPE_MONORAIL,
  RIDE_TYPE_MINI_SUSPENDED_COASTER,
  RIDE_TYPE_BOAT_HIRE,
  RIDE_TYPE_WOODEN_WILD_MOUSE,
  RIDE_TYPE_STEEPLECHASE = 10,
  RIDE_TYPE_CAR_RIDE,
  RIDE_TYPE_LAUNCHED_FREEFALL,
  RIDE_TYPE_BOBSLEIGH_COASTER,
  RIDE_TYPE_OBSERVATION_TOWER,
  RIDE_TYPE_LOOPING_ROLLER_COASTER,
  RIDE_TYPE_DINGHY_SLIDE,
  RIDE_TYPE_MINE_TRAIN_COASTER,
  RIDE_TYPE_CHAIRLIFT,
  RIDE_TYPE_CORKSCREW_ROLLER_COASTER,
  RIDE_TYPE_MAZE = 20,
  RIDE_TYPE_SPIRAL_SLIDE,
  RIDE_TYPE_GO_KARTS,
  RIDE_TYPE_LOG_FLUME,
  RIDE_TYPE_RIVER_RAPIDS,
  RIDE_TYPE_DODGEMS,
  RIDE_TYPE_SWINGING_SHIP,
  RIDE_TYPE_SWINGING_INVERTER_SHIP,
  RIDE_TYPE_FOOD_STALL,
  RIDE_TYPE_1D,
  RIDE_TYPE_DRINK_STALL = 30,
  RIDE_TYPE_1F,
  RIDE_TYPE_SHOP,
  RIDE_TYPE_MERRY_GO_ROUND,
  RIDE_TYPE_22,
  RIDE_TYPE_INFORMATION_KIOSK,
  RIDE_TYPE_TOILETS,
  RIDE_TYPE_FERRIS_WHEEL,
  RIDE_TYPE_MOTION_SIMULATOR,
  RIDE_TYPE_3D_CINEMA,
  RIDE_TYPE_TOP_SPIN = 40,
  RIDE_TYPE_SPACE_RINGS,
  RIDE_TYPE_REVERSE_FREEFALL_COASTER,
  RIDE_TYPE_LIFT,
  RIDE_TYPE_VERTICAL_DROP_ROLLER_COASTER,
  RIDE_TYPE_CASH_MACHINE,
  RIDE_TYPE_TWIST,
  RIDE_TYPE_HAUNTED_HOUSE,
  RIDE_TYPE_FIRST_AID,
  RIDE_TYPE_CIRCUS,
  RIDE_TYPE_GHOST_TRAIN = 50,
  RIDE_TYPE_TWISTER_ROLLER_COASTER,
  RIDE_TYPE_WOODEN_ROLLER_COASTER,
  RIDE_TYPE_SIDE_FRICTION_ROLLER_COASTER,
  RIDE_TYPE_STEEL_WILD_MOUSE,
  RIDE_TYPE_MULTI_DIMENSION_ROLLER_COASTER,
  RIDE_TYPE_MULTI_DIMENSION_ROLLER_COASTER_ALT,
  RIDE_TYPE_FLYING_ROLLER_COASTER,
  RIDE_TYPE_FLYING_ROLLER_COASTER_ALT,
  RIDE_TYPE_VIRGINIA_REEL,
  RIDE_TYPE_SPLASH_BOATS = 60,
  RIDE_TYPE_MINI_HELICOPTERS,
  RIDE_TYPE_LAY_DOWN_ROLLER_COASTER,
  RIDE_TYPE_SUSPENDED_MONORAIL,
  RIDE_TYPE_LAY_DOWN_ROLLER_COASTER_ALT,
  RIDE_TYPE_REVERSER_ROLLER_COASTER,
  RIDE_TYPE_HEARTLINE_TWISTER_COASTER,
  RIDE_TYPE_MINI_GOLF,
  RIDE_TYPE_GIGA_COASTER,
  RIDE_TYPE_ROTO_DROP,
  RIDE_TYPE_FLYING_SAUCERS = 70,
  RIDE_TYPE_CROOKED_HOUSE,
  RIDE_TYPE_MONORAIL_CYCLES,
  RIDE_TYPE_COMPACT_INVERTED_COASTER,
  RIDE_TYPE_WATER_COASTER,
  RIDE_TYPE_AIR_POWERED_VERTICAL_COASTER,
  RIDE_TYPE_INVERTED_HAIRPIN_COASTER,
  RIDE_TYPE_MAGIC_CARPET,
  RIDE_TYPE_SUBMARINE_RIDE,
  RIDE_TYPE_RIVER_RAFTS,
  RIDE_TYPE_50 = 80,
  RIDE_TYPE_ENTERPRISE,
  RIDE_TYPE_52,
  RIDE_TYPE_53,
  RIDE_TYPE_54,
  RIDE_TYPE_55,
  RIDE_TYPE_INVERTED_IMPULSE_COASTER,
  RIDE_TYPE_MINI_ROLLER_COASTER,
  RIDE_TYPE_MINE_RIDE,
  RIDE_TYPE_59,
  RIDE_TYPE_LIM_LAUNCHED_ROLLER_COASTER = 90,
  RIDE_TYPE_HYPERCOASTER,
  RIDE_TYPE_HYPER_TWISTER,
  RIDE_TYPE_MONSTER_TRUCKS,
  RIDE_TYPE_SPINNING_WILD_MOUSE,
  RIDE_TYPE_CLASSIC_MINI_ROLLER_COASTER,
  RIDE_TYPE_HYBRID_COASTER,
  RIDE_TYPE_SINGLE_RAIL_ROLLER_COASTER,
  RIDE_TYPE_ALPINE_COASTER,
  RIDE_TYPE_CLASSIC_WOODEN_ROLLER_COASTER,

  RIDE_TYPE_COUNT
}

const flatRides = [
  RideType.RIDE_TYPE_BOAT_HIRE,
  RideType.RIDE_TYPE_OBSERVATION_TOWER,
  RideType.RIDE_TYPE_MAZE,
  RideType.RIDE_TYPE_DODGEMS,
  RideType.RIDE_TYPE_SWINGING_SHIP,
  RideType.RIDE_TYPE_SWINGING_INVERTER_SHIP,
  RideType.RIDE_TYPE_MERRY_GO_ROUND,
  RideType.RIDE_TYPE_FERRIS_WHEEL,
  RideType.RIDE_TYPE_MOTION_SIMULATOR,
  RideType.RIDE_TYPE_3D_CINEMA,
  RideType.RIDE_TYPE_TOP_SPIN,
  RideType.RIDE_TYPE_SPACE_RINGS,
  RideType.RIDE_TYPE_TWIST,
  RideType.RIDE_TYPE_HAUNTED_HOUSE,
  RideType.RIDE_TYPE_CIRCUS,
  RideType.RIDE_TYPE_MINI_HELICOPTERS,
  RideType.RIDE_TYPE_MINI_GOLF,
  RideType.RIDE_TYPE_FLYING_SAUCERS,
  RideType.RIDE_TYPE_CROOKED_HOUSE,
  RideType.RIDE_TYPE_MAGIC_CARPET,
  RideType.RIDE_TYPE_ENTERPRISE,
  RideType.RIDE_TYPE_SPIRAL_SLIDE,
  RideType.RIDE_TYPE_ROTO_DROP,
  RideType.RIDE_TYPE_LIFT
]

const trackedRides = [
  RideType.RIDE_TYPE_SPIRAL_ROLLER_COASTER,
  RideType.RIDE_TYPE_STAND_UP_ROLLER_COASTER,
  RideType.RIDE_TYPE_SUSPENDED_SWINGING_COASTER,
  RideType.RIDE_TYPE_INVERTED_ROLLER_COASTER,
  RideType.RIDE_TYPE_JUNIOR_ROLLER_COASTER,
  RideType.RIDE_TYPE_MINIATURE_RAILWAY,
  RideType.RIDE_TYPE_MONORAIL,
  RideType.RIDE_TYPE_MINI_SUSPENDED_COASTER,
  RideType.RIDE_TYPE_WOODEN_WILD_MOUSE,
  RideType.RIDE_TYPE_STEEPLECHASE,
  RideType.RIDE_TYPE_CAR_RIDE,
  RideType.RIDE_TYPE_LAUNCHED_FREEFALL,
  RideType.RIDE_TYPE_BOBSLEIGH_COASTER,
  RideType.RIDE_TYPE_LOOPING_ROLLER_COASTER,
  RideType.RIDE_TYPE_DINGHY_SLIDE,
  RideType.RIDE_TYPE_MINE_TRAIN_COASTER,
  RideType.RIDE_TYPE_CHAIRLIFT,
  RideType.RIDE_TYPE_CORKSCREW_ROLLER_COASTER,
  RideType.RIDE_TYPE_GO_KARTS,
  RideType.RIDE_TYPE_LOG_FLUME,
  RideType.RIDE_TYPE_RIVER_RAPIDS,
  RideType.RIDE_TYPE_REVERSE_FREEFALL_COASTER,
  RideType.RIDE_TYPE_VERTICAL_DROP_ROLLER_COASTER,
  RideType.RIDE_TYPE_GHOST_TRAIN,
  RideType.RIDE_TYPE_TWISTER_ROLLER_COASTER,
  RideType.RIDE_TYPE_WOODEN_ROLLER_COASTER,
  RideType.RIDE_TYPE_SIDE_FRICTION_ROLLER_COASTER,
  RideType.RIDE_TYPE_STEEL_WILD_MOUSE,
  RideType.RIDE_TYPE_MULTI_DIMENSION_ROLLER_COASTER,
  RideType.RIDE_TYPE_MULTI_DIMENSION_ROLLER_COASTER_ALT,
  RideType.RIDE_TYPE_FLYING_ROLLER_COASTER,
  RideType.RIDE_TYPE_FLYING_ROLLER_COASTER_ALT,
  RideType.RIDE_TYPE_VIRGINIA_REEL,
  RideType.RIDE_TYPE_SPLASH_BOATS,
  RideType.RIDE_TYPE_LAY_DOWN_ROLLER_COASTER,
  RideType.RIDE_TYPE_SUSPENDED_MONORAIL,
  RideType.RIDE_TYPE_LAY_DOWN_ROLLER_COASTER_ALT,
  RideType.RIDE_TYPE_REVERSER_ROLLER_COASTER,
  RideType.RIDE_TYPE_HEARTLINE_TWISTER_COASTER,
  RideType.RIDE_TYPE_GIGA_COASTER,
  RideType.RIDE_TYPE_INVERTED_IMPULSE_COASTER,
  RideType.RIDE_TYPE_MINI_ROLLER_COASTER,
  RideType.RIDE_TYPE_MINE_RIDE,
  RideType.RIDE_TYPE_LIM_LAUNCHED_ROLLER_COASTER,
  RideType.RIDE_TYPE_HYPERCOASTER,
  RideType.RIDE_TYPE_HYPER_TWISTER,
  RideType.RIDE_TYPE_MONSTER_TRUCKS,
  RideType.RIDE_TYPE_SPINNING_WILD_MOUSE,
  RideType.RIDE_TYPE_CLASSIC_MINI_ROLLER_COASTER,
  RideType.RIDE_TYPE_HYBRID_COASTER,
  RideType.RIDE_TYPE_SINGLE_RAIL_ROLLER_COASTER,
  RideType.RIDE_TYPE_ALPINE_COASTER,
  RideType.RIDE_TYPE_CLASSIC_WOODEN_ROLLER_COASTER
]

/**
 * Initialize ride data.
 */
function initRideData() {
  context.setInterval(() => {
    /**
     * Update ride count.
     */
    baseData.local.rides.ride_count_total.store.set(
      map.rides.filter((ride) => ride.classification === "ride").length
    )
    baseData.local.rides.ride_count_flat.store.set(
      map.rides.filter((ride) => flatRides.indexOf(ride.type) !== -1).length
    )
    baseData.local.rides.ride_count_tracked.store.set(
      map.rides.filter((ride) => trackedRides.indexOf(ride.type) !== -1).length
    )

    /**
     * Update ride excitement, intensity, nausea, value, price and admission average.
     */
    let excitementSum = 0,
      intensitySum = 0,
      nauseaSum = 0,
      valueSum = 0,
      priceSum = 0,
      admissionSum = 0
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (excitementSum += ride.excitement / 100))
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (intensitySum += ride.intensity / 100))
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (nauseaSum += ride.nausea / 100))
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (valueSum += ride.value))
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (priceSum += ride.price[0]))
    map.rides
      .filter((ride) => ride.classification === "ride")
      .forEach((ride) => (admissionSum += ride.totalCustomers))
    branchData.local.rides.ride_excitement_ave_sum[0].store.set(excitementSum)
    branchData.local.rides.ride_intensity_ave_sum[0].store.set(intensitySum)
    branchData.local.rides.ride_nausea_ave_sum[0].store.set(nauseaSum)
    branchData.local.rides.ride_value_ave_sum[0].store.set(valueSum)
    branchData.local.rides.ride_price_ave_sum[0].store.set(priceSum)
    branchData.local.rides.ride_admission_ave_sum[0].store.set(admissionSum)
  }, baseData.global.update_ratio.get() * 1000)

  /**
   * Record the number of crashes of each type.
   */
  context.subscribe("vehicle.crash", (e) => {
    baseData.local.rides.crash_count_total.store.set(
      baseData.local.rides.crash_count_total.store.get() + 1
    )
    switch (e.crashIntoType) {
      case "another_vehicle":
        baseData.local.rides.crash_count_into_vehicle.store.set(
          baseData.local.rides.crash_count_into_vehicle.store.get() + 1
        )
        break
      case "land":
        baseData.local.rides.crash_count_into_land.store.set(
          baseData.local.rides.crash_count_into_land.store.get() + 1
        )
        break
      case "water":
        baseData.local.rides.crash_count_into_water.store.set(
          baseData.local.rides.crash_count_into_water.store.get() + 1
        )
        break
      default:
        break
    }
  })
}

export { initRideData }

namespace Cleanup {
  /**
   * The keys that are deprecated and should be removed from the park storage.
   */
  const deprecatedKeys: string[] = [
    "park_rating_ave_sample_count",
    "park_rating_ave",
    "ride_excitement_ave_sum",
    "ride_intensity_ave_sum",
    "ride_nausea_ave_sum",
    "ride_value_ave_sum",
    "ride_admission_ave_sum",
    "ride_age_ave_sum",
    "ride_downtime_ave_sum",
    "ride_price_ave_sum",
    "park_rating_month_ave_sample_count",
    "park_rating_month_ave",
    "park_rating_year_ave_sample_count",
    "park_rating_year_ave",

    "dynamicdashboard.branch.ride_excitement_ave_sum",
    "dynamicdashboard.branch.ride_intensity_ave_sum",
    "dynamicdashboard.branch.ride_nausea_ave_sum",
    "dynamicdashboard.branch.ride_value_ave_sum",
    "dynamicdashboard.branch.ride_price_ave_sum",
    "dynamicdashboard.branch.ride_admission_ave_sum",
    "dynamicdashboard.branch.ride_age_ave_sum",
    "dynamicdashboard.branch.ride_downtime_ave_sum"
  ]

  /**
   * Removes deprecated keys from the park storage.
   */
  export function execute() {
    for (const key of deprecatedKeys) {
      context.getParkStorage().set(key, undefined)
    }
  }
}

export default Cleanup

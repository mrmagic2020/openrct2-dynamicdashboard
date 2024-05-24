import { interval } from "../data/main"
import { increment } from "../utils/storeutil"
import { baseData, branchData } from "./main"

namespace FinanceData {
  /**
   * Updates the player's income and expenditure based on executed actions.
   * @param e - The arguments for the game action.
   * @returns
   */
  function updatePlayerActionIE(e: GameActionEventArgs<object>): void {
    if (
      interval.isPaused ||
      e.isClientOnly ||
      typeof e.result.cost === "undefined"
    )
      return

    // If the cost of the action is negative, increment the player's income.
    if (e.result.cost < 0) {
      increment(
        branchData.local.finance.income_player_action.store,
        -e.result.cost
      )
    } else {
      /**
       * `network.currentPlayer.moneySpent` is only updated when the network mode is not set to "none".
       * We have to manually update the player's expenditure in a single-player session.
       */
      if (network.mode === "none") {
        increment(
          branchData.local.finance.expenditure_player_action.store,
          -e.result.cost
        )
      }
    }
    /**
     * If the cost of the action is positive, it will be added to the player's total expenditure, provided by the plugin API.
     * @see {network.currentPlayer.moneySpent}
     */
  }

  /**
   * Updates the player's income and expenditure based on the total profit of each ride.
   * @returns
   */
  function updateParkIE(): void {
    if (interval.isPaused) return

    let income = 0,
      expenditure = 0
    income += park.totalIncomeFromAdmissions
    map.rides.forEach((ride) => {
      if (ride.totalProfit >= 0) income += ride.totalProfit
      else expenditure += ride.totalProfit // Negative when running costs exceed income
      // console.log(`Ride: ${ride.name} | Profit: ${ride.totalProfit}`)
    })

    branchData.local.finance.income_park.store.set(income)
    branchData.local.finance.expenditure_network.store.set(expenditure)
  }

  function updateCompanyValue(): void {
    if (interval.isPaused) return
    baseData.local.finance.company_value.store.set(park.companyValue / 10)
  }

  export function update(): void {
    updateParkIE()
    updateCompanyValue()
  }

  /**
   * Initialise finance data.
   */
  export function init(): void {
    context.subscribe("action.execute", updatePlayerActionIE)

    let tick = 0
    context.subscribe("interval.tick", () => {
      tick++
      if (tick >= 512) {
        tick = 0
        updateCompanyValue()
      }
    })

    interval.register(
      updateParkIE,
      baseData.global.update_frequency.get() * 1000
    )
  }
}

export { FinanceData }

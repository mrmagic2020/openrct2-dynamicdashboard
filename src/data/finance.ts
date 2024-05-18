import interval from "../utils/interval"
import { increment } from "../utils/storeutil"
import { baseData, branchData } from "./main"

namespace FinanceData {
  function updatePlayerIncomeAndExpenditure(
    e: GameActionEventArgs<object>
  ): void {
    if (
      interval.isPaused ||
      e.isClientOnly ||
      typeof e.result.cost === "undefined"
    )
      return

    if (e.result.cost > 0) {
      increment(baseData.local.finance.total_expenditure.store, e.result.cost)
    } else {
      increment(
        branchData.local.finance.income_player_action.store,
        -e.result.cost
      )
    }
    console.log(
      `Type: ${e.result.expenditureType ?? "Unknown"}, Cost: ${e.result.cost}`
    )
  }

  function updateParkIncomeAndExpenditure(): void {
    if (interval.isPaused) return
    let income = 0
    income += park.totalIncomeFromAdmissions
    map.rides.forEach((ride) => {
      income += ride.totalProfit
    })
    branchData.local.finance.income_park.store.set(income)
  }

  function updateCompanyValue(): void {
    if (interval.isPaused) return
    baseData.local.finance.company_value.store.set(park.companyValue)
  }

  export function update(): void {
    updateCompanyValue()
  }

  export function init(): void {
    context.subscribe("action.execute", updatePlayerIncomeAndExpenditure)

    let tick = 0
    context.subscribe("interval.tick", () => {
      tick++
      if (tick >= 512) {
        tick = 0
        updateCompanyValue()
      }
    })

    interval.register(
      updateParkIncomeAndExpenditure,
      baseData.global.update_ratio.get() * 1000
    )
  }
}

export { FinanceData }

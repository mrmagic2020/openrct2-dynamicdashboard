declare const __VERSION__: string
declare const __CHANGELOG__: string

namespace DynamicDashboard {
  export const name = "dynamicdashboard"
  export const version = __VERSION__
  export const authors = ["mrmagic2020"]
  export const type = "intransient"
  export const licence = "MIT"
  export const targetApiVersion = 87

  export const specialThanks = [
    "Basssiiie",
    "Marcel Vos",
    "Isoitiro",
    "Manticore_007"
  ]
  export const specialThanksWrapped: string = specialThanks.reduce(
    (acc, cur, i) => {
      if (i === specialThanks.length - 1) {
        if (i % 3 === 0) {
          return acc + "\nand " + cur
        }
        return acc + ", and " + cur
      } else {
        if (i % 3 === 0) {
          return acc + "\n" + cur
        }
        return acc + ", " + cur
      }
    }
  )

  export const url = "github.com/mrmagic2020/openrct2-dynamicdashboard"
  export const urlWrapped = "github.com/mrmagic2020/\nopenrct2-dynamicdashboard"

  export const changelog = __CHANGELOG__
}

export default DynamicDashboard

namespace Currency {
  /**
   * @deprecated Use `Currency.localise` instead.
   *
   * Format a number into money notation.
   * @param value The value to format.
   * @param separator The separator to use. Default is ",".
   * @returns {string} The formatted money notation.
   *
   * @example
   * formatMoney(1000); // returns "1,000"
   * formatMonkey(1000000, "."); // returns "1.000.000"
   */
  export function formatMoney(value: number, separator: string = ","): string {
    if (isNaN(value)) return value.toString()
    if (Math.abs(value) < 1000) return value.toString()

    let value_s: string = value.toString()
    const negative = value < 0
    if (negative) value_s = value_s.slice(1)

    // Split the integer and decimal part
    const sliced: string[] = value_s.split(".")
    const integers: string = sliced[0]
    const decimals: string = sliced[1]

    /**
     * The array representation of the integer part.
     */
    let integert_a: string[] = integers.split("")

    // Insert commas
    for (let i = integert_a.length - 3; i > 0; i -= 3) {
      integert_a.splice(i, 0, separator)
    }

    return (
      (negative ? "-" : "") +
      integert_a.join("").concat(decimals ? "." + decimals : "")
    )
  }

  /**
   * Localises a numeric value into a formatted currency string.
   * @param value - The numeric value to be localised.
   * @param twodp - Optional parameter indicating whether to format the currency string with 2 decimal places. Default is `true`.
   * @returns The localised currency string.
   */
  export function localise(value: number, twodp: boolean = true): string {
    return context.formatString(twodp ? "{CURRENCY2DP}" : "{CURRENCY}", value)
  }
}

export default Currency

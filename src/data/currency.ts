import { store } from "openrct2-flexui"
import { baseData } from "./main"

/**
 * Reads the currency settings from user configuration file.
 */
const currency = {
  format: store<string>(
    context.configuration.get("general.currency_format", "USD")
  ),
  custom: {
    affix: store<"SUFFIX" | "PREFIX">(
      context.configuration.get("general.custom_currency_affix", "SUFFIX")
    ),
    symbol: store<string>(
      context.configuration.get("general.custom_currency_symbol", "Ctm")
    )
  }
}

interface CurrencySymbolReference {
  [key: string]: string
}

/**
 * The reference list of currency symbols.
 * @see CurrencySymbolReference
 */
const currencySymbolReference: CurrencySymbolReference = {
  GBP: "£",
  USD: "$",
  FRF: "₣",
  DEM: "DM",
  JPY: "¥",
  ESP: "Pts",
  ITL: "L",
  NLG: "ƒ",
  SEK: "kr",
  EUR: "€",
  KRW: "₩",
  RUB: "₽",
  CZK: "Kč",
  HKD: "HK$",
  TWD: "NT$",
  CNY: "CN¥",
  HUF: "Ft"
}

/**
 * Initialize currency data.
 */
function initCurrencyData(): void {
  context.setInterval(() => {
    currency.format.set(
      context.configuration.get("general.currency_format", "USD")
    )
    currency.custom.affix.set(
      context.configuration.get("general.custom_currency_affix", "SUFFIX")
    )
    currency.custom.symbol.set(
      context.configuration.get("general.custom_currency_symbol", "Ctm")
    )
  }, baseData.global.update_frequency.get() * 1000)
}

/**
 * Gets the currency symbol.
 *
 * @returns {string} The currency symbol.
 */
function getCurrencySymbol(): string {
  let symbol = "?"
  if (currency.format.get() === "CUSTOM") {
    symbol = currency.custom.symbol.get()
  } else {
    symbol = currencySymbolReference[currency.format.get()]
  }
  return symbol
}

/**
 * Format a number into money notation.
 * @param value The value to format.
 * @param separator The separator to use. Default is ",".
 * @returns {string} The formatted money notation.
 *
 * @example
 * formatMoney(1000); // returns "1,000"
 * formatMonkey(1000000, "."); // returns "1.000.000"
 */
function formatMoney(value: number, separator: string = ","): string {
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
 * Gets the entire currency unit.
 * @param value The value to format.
 * @param symbol The currency symbol to use. Default is the current currency symbol.
 * @returns {string} The formatted currency unit.
 *
 * @example
 * getCurrencyUnit(2, "$"); // returns "2$"
 */
function getCurrencyUnit(value: number, symbol?: string): string {
  let unit = formatMoney(value)

  if (symbol === undefined) symbol = getCurrencySymbol()

  if (currency.format.get() === "CUSTOM") {
    if (currency.custom.affix.get() === "SUFFIX") unit += symbol
    else unit = symbol + unit
  } else unit += symbol

  return unit
}

export { initCurrencyData, getCurrencyUnit }

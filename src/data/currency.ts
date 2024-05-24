import { store } from "openrct2-flexui"
import { baseData } from "./main"
import { formatMoney } from "../utils/formatMoney"

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

export { initCurrencyData, getCurrencyUnit, formatMoney }

import { store } from "openrct2-flexui";
import { baseData } from "./main";

/**
 * Reads the currency settings from user configuration file. 
 */
const currency = {
  format: store<string>(context.configuration.get("general.currency_format", "USD")),
  custom: {
    affix: store<"SUFFIX" | "PREFIX">(context.configuration.get("general.custom_currency_affix", "SUFFIX")),
    symbol: store<string>(context.configuration.get("general.custom_currency_symbol", "Ctm"))
  }
};

interface CurrencySymbolReference{
  [key: string] : string
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
};

/**
 * Initialize currency data.
 * 
 * @returns {void}
 */
function initCurrencyData(): void {
  context.setInterval(() => {
    currency.format.set(context.configuration.get("general.currency_format", "USD"));
    currency.custom.affix.set(context.configuration.get("general.custom_currency_affix", "SUFFIX"));
    currency.custom.symbol.set(context.configuration.get("general.custom_currency_symbol", "Ctm"));
  }, baseData.global.update_ratio.get()*1000);

  console.log(context.configuration.getAll("general"));
}

/**
 * Gets the currency character. 
 * 
 * @returns {string}
 */
function getCurrencySymbol(): string {
  let symbol = "?";
  if (currency.format.get() === "CUSTOM") {
    symbol = currency.custom.symbol.get();
  } else {
    symbol = currencySymbolReference[currency.format.get()];
  }
  return symbol;
}

/**
 * Format a number into money notation.
 * @param value The value to format.
 * @param separator The separator to use. Default is ",".
 * @returns {string}
 * 
 * @example
 * formatMoney(1000); // returns "1,000"
 * formatMonkey(1000000, "."); // returns "1.000.000"
 */
function formatMoney(value: number, separator: string = ","): string {
  let value_s = value.toString();

  // Split the integer and decimal part
  let integers = value_s.split(".")[0];
  let decimals = value_s.split(".")[1];

  /**
   * The array representation of the integer part.
   */
  let integert_a = integers.split(".")[0].split("");

  // Insert commas
  let diff = 0;
  for (let i = 1; i < integers.length; i++) {
    if ((value_s.length - i) % 3 === 0) {
      integert_a.splice(i + diff, 0, separator);
      diff ++;
    }
  }
  
  return integert_a.join("").concat(decimals ? "." + decimals : "");
}

/**
 * Gets the entire currency unit. 
 * @param value The value to format.
 * @param symbol The currency symbol to use. Default is the current currency symbol.
 * @returns {string}
 * 
 * @example 
 * getCurrencyUnit(2, "$"); // returns "2$"
 */
function getCurrencyUnit(value: number, symbol?: string): string {
  let unit = formatMoney(value);

  if (symbol === undefined)
    symbol = getCurrencySymbol();

  if (currency.format.get() === "CUSTOM") {
    if (currency.custom.affix.get() === "SUFFIX")
      unit += symbol;
    else 
      unit = symbol + unit;
  } else unit += symbol;

  return unit;
}

export { currency, initCurrencyData, getCurrencyUnit }

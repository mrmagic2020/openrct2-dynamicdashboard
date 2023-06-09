import { store } from "openrct2-flexui";
import { baseData } from "./main";

/**
 * The currency settings from user configuration file. 
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
 * @returns 
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
 * @param value 
 * @returns 
 * 
 * @example
 * formatMoney(1000); // returns "1,000"
 */
function formatMoney(value: number): string {
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
      integert_a.splice(i + diff, 0, ",");
      diff ++;
    }
  }
  
  return integert_a.join("").concat(decimals ? "." + decimals : "");
}

/**
 * Gets the entire currency unit. 
 * @param value 
 * @param symbol
 * @returns 
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

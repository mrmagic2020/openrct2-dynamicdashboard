import { Locale, en_GB, en_US, zh_CN } from "./locale/index"
import { baseData } from "../data/main"
import { store } from "openrct2-flexui"

type LanguageKey = "en_GB" | "en_US" | "zh_CN"

const defaultLanguage: LanguageKey = "en_GB"
const languageStore = store<Locale>()
const locales: { [key: string]: any } = {
  en_GB,
  en_US,
  zh_CN
}

let currentLanguage: LanguageKey = defaultLanguage
let language: Locale

/**
 * Fills missing keys in the target object with values from the source object.
 * If a key exists in the source object but not in the target object, the value
 * of that key will be copied to the target object.
 * If a key exists in both the source and target objects, and the value of the
 * key in the source object is an object, the function will recursively fill
 * missing keys in the nested objects.
 *
 * @param source - The source object containing the keys and values to fill.
 * @param target - The target object to fill with missing keys.
 * @returns {void}
 */
function fillMissingKeys(
  source: { [key: string]: any },
  target: { [key: string]: any },
  locale: LanguageKey
): void {
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === "object" && source[key] !== null) {
      // Ensure the target key is an object too
      if (!target[key] || typeof target[key] !== "object") {
        target[key] = {}
      }
      // Recursive call for nested objects
      fillMissingKeys(source[key], target[key], locale)
    } else {
      // Copy the value if the key does not exist in target
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key]
        if (locale !== "en_US")
          console.log(`${locale}: Missing key "${key}", using default value.`)
      }
    }
  })
}

/**
 * Synchronises the locale objects by filling missing keys from the default language.
 *
 * Since OpenRCT2 scripting does not support file I/O, this function is used to
 * fallback to the default language when a key is missing in a specific language.
 *
 * @returns {void}
 */
function syncLocale(): void {
  Object.keys(locales).forEach((key) => {
    if (key !== defaultLanguage) {
      fillMissingKeys(
        locales[defaultLanguage],
        locales[key],
        key as LanguageKey
      )
    }
  })
}

/**
 * Get user's preferred language.
 * The result is formatted as `xx_YY` where `xx` is the language code and `YY` is the country code.
 *
 * @returns {LanguageKey} User's preferred language.
 */
function getUserLanguage(): LanguageKey {
  let lang: string =
    context.configuration.get("general.language") || defaultLanguage
  lang = lang.replace("-", "_") // replace hyphen with underscore
  return lang in locales ? (lang as LanguageKey) : defaultLanguage
}

/**
 * Initialize language.
 *
 * @returns {void}
 */
function initLang_new(): void {
  syncLocale()

  currentLanguage = getUserLanguage()
  languageStore.set(locales[currentLanguage])
  language = languageStore.get() as Locale

  /**
   * Update language with user config every `update_frequency` seconds.
   */
  context.setInterval(() => {
    currentLanguage = getUserLanguage()
    languageStore.set(locales[currentLanguage])
  }, baseData.global.update_frequency.get() * 1000)

  /**
   * Update language when user changes language.
   */
  languageStore.subscribe((lang: Locale | undefined) => {
    if (typeof lang !== "undefined") language = lang
  })
}

/**
 * Replace `<insertable segments>` in a translation text with specified value.
 * If there are more values than insertable segments, the remaining values will be appended to the end of the text.
 * @param str Translation text.
 * @param items Values to be inserted in order.
 * @returns {string} Finalized text.
 */
function tr(str: string, ...items: any[]): string {
  for (let i = 0; i < str.length; i++) {
    if (items.length === 0) break
    let start, end
    if (str[i] === "<") {
      start = i
      for (let j = i + 1; j < str.length; j++) {
        if (str[j] === ">") {
          end = j + 1
          break
        }
      }
      str = str.replace(str.substring(start, end), items[0].toString())
      items.shift()
    }
  }

  /**
   * If there are still items left, append them to the end of the string.
   */
  if (items.length > 0) {
    items.forEach((item) => {
      str += item.toString()
    })
  }

  return str
}

export { initLang_new, tr, language }

import { zh_CN, en_US } from "./locale/index"
import { baseData } from "../data/main"
import { store } from "openrct2-flexui"

type LanguageKey = "en_US" | "zh_CN"

const defaultLanguage: LanguageKey = "en_US"
const languageStore = store()
const locales = {
  en_US,
  zh_CN
}

let currentLanguage: LanguageKey = defaultLanguage
let language: any

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
  console.log("User set lang: " + lang)
  return lang in locales ? (lang as LanguageKey) : defaultLanguage
}

/**
 * Initialize language.
 *
 * @returns {void}
 */
function initLang_new(): void {
  currentLanguage = getUserLanguage()
  languageStore.set(locales[currentLanguage])
  language = languageStore.get()

  console.log(`Current language: ${currentLanguage}`)
  console.log(`Language: ${language}`)

  /**
   * Update language with user config every `update_ratio` seconds.
   */
  context.setInterval(() => {
    baseData.global.language.set(currentLanguage)
  }, baseData.global.update_ratio.get() * 1000)

  /**
   * Update language when user changes language.
   */
  baseData.global.language.subscribe((lang) => {
    languageStore.set(locales[lang as LanguageKey])
  })

  /**
   * Update language when user changes language.
   */
  languageStore.subscribe((lang) => {
    language = lang
  })
}

/**
 * Replace `<insertable segments>` in a translation text with specified value.
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
  return str
}

export { initLang_new, tr, language }

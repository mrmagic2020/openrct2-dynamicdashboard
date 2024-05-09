import { baseData } from "../data/main"
import { Language } from "./template"
import { en_US } from "./en-US"
import { zh_CN } from "./zh-CN"
import { WritableStore, store } from "openrct2-flexui"

/**
 * @deprecated v1.0.0-pre.3
 */
interface LanguageIndex {
  [key: string]: Language
}

/**
 * Index of all languages. **Do not alter order.**
 * @deprecated v1.0.0-pre.3
 */
const index: LanguageIndex = {
  en_US: en_US,
  zh_CN: zh_CN
}

/**
 * Language id of all languages.
 * @deprecated v1.0.0-pre.3
 *
 * **Ordered according to `index`.**
 *
 * @see index
 */
const idList: string[] = ["en_US", "zh_CN"]

/**
 * Index of all string representatives of languages.
 * @deprecated v1.0.0-pre.3
 *
 * **Ordered according to `index`.**
 *
 * @see index
 */
const languageList = [
  index.en_US.ui.toolbox.language_item,
  index.zh_CN.ui.toolbox.language_item
]

/**
 * Store for language selection.
 */
const languageStore: WritableStore<Language> = store<Language>(
  index[baseData.global.language.get()]
)

const defaultLanguage: string = "en_US"

/**
 * Export extracted Language type for easy use.
 */
let language: Language = languageStore.get()

/**
 * Get user's preferred language.
 * The result is formatted as `xx_YY` where `xx` is the language code and `YY` is the country code.
 *
 * @returns {string} User's preferred language.
 */
function getUserLanguage(): string {
  let lang: string =
    context.configuration.get("general.language") || defaultLanguage
  lang = lang.replace("-", "_") // replace hyphen with underscore
  console.log("User set lang: " + lang)
  return lang
}

/**
 * Get language index.
 * @deprecated v1.0.0-pre.3
 *
 * @param lang Language id.
 * @returns {number} Language index.
 */
function getLanguageIndex(lang: string): number {
  let idx: number = idList.indexOf(lang)
  if (idx == -1) idx = getLanguageIndex(defaultLanguage)
  return idx
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

/**
 * Initialize language.
 * @deprecated v1.0.0-pre.3
 *
 * @returns {void}
 */
function initLang(): void {
  /**
   * Update `languageStore` when language is changed.
   *
   * @see languageStore
   */
  baseData.global.language.subscribe((_value) => {
    languageStore.set(index[baseData.global.language.get()])
    // console.log("Language changed to " + baseData.global.language.get());
  })

  // update language
  baseData.global.language_index.subscribe((value: number) => {
    baseData.global.language.set(idList[value])
  })

  // update exported language object
  languageStore.subscribe((_value: Language) => {
    language = languageStore.get()
    // console.log("Language updated.");
  })

  /**
   * Set language to user's preference or default language.
   */
  baseData.global.language_index.set(getLanguageIndex(getUserLanguage()))
  // console.log("User set lang: " + context.configuration.get("general.language"))
  // console.log("Language index set to " + baseData.global.language_index.get())

  /**
   * Update language every `update_ratio` seconds.
   */
  context.setInterval(() => {
    baseData.global.language_index.set(getLanguageIndex(getUserLanguage()))
  }, baseData.global.update_ratio.get() * 1000)
}

export { language, languageList, initLang, tr }

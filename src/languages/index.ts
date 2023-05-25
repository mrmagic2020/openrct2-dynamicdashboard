import { baseData } from "../data/main";
import { Language } from "./template";
import { en_US } from "./en-US"
import { zh_CN } from "./zh-CN";
import { WritableStore, store } from "openrct2-flexui";

/**
 * Index of all languages. **Do not alter order.**
 */
const index = {
  en_US: en_US,
  zh_CN: zh_CN
};

/**
 * Language id of all languages. 
 * 
 * **Ordered according to `index`.**
 * 
 * @see index
 */
const idList : [
  "en_US",
  "zh_CN"
] = [
  "en_US",
  "zh_CN"
];

/**
 * Index of all string representatives of languages. 
 * 
 * **Ordered according to `index`.**
 * 
 * @see index
 */
const languageList = [
  index.en_US.ui.toolbox.language_item,
  index.zh_CN.ui.toolbox.language_item
];

const languageStore : WritableStore<Language> = store<Language>(index[baseData.global.language.get()]);

/**
 * Export extracted Language type for easy use. 
 */
let language : Language = languageStore.get();

/**
 * Replace `<insertable segments>` in a translation text with specified value. 
 * @param str Translation text. 
 * @param items Values to be inserted in order. 
 * @returns Finalized text. 
 */
function tr(str: string, ...items: any[]) {
  for (let i = 0; i < str.length; i++) {
    if (items.length === 0) break;
    let start, end;
    if (str[i] === "<") {
      start = i;
      for (let j = i + 1; j < str.length; j++) {
        if (str[j] === ">") {
          end = j + 1;
        }
      }
      str = str.replace(str.substring(start, end), items[0].toString());
      items.shift();
    }
  }
  return str;
}

function initLang() {
  /**
   * Update `language Store`
   * 
   * @see languageStore
   */
  baseData.global.language.subscribe((_value) => {
    languageStore.set(index[baseData.global.language.get()]);
  });

  // update language
  baseData.global.language_index.subscribe((value : number) => {
    baseData.global.language.set(idList[value]);
  });

  // update exported language object
  languageStore.subscribe((_value : Language) => {
    language = languageStore.get();
  });
}

export { language, languageList, initLang, tr };

import _en_GB from "./en-GB.json"
import _en_US from "./en-US.json"
import _zh_CN from "./zh-CN.json"

type Locale = typeof _en_GB
type PartialLocale<T> = {
  [P in keyof T]?: T[P] extends object ? PartialLocale<T[P]> : T[P]
}

const en_GB: Locale = _en_GB
const en_US: PartialLocale<Locale> = _en_US
const zh_CN: PartialLocale<Locale> = _zh_CN

export { type Locale, en_GB, en_US, zh_CN }

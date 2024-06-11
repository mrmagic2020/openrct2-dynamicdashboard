import { tab } from "openrct2-flexui"
import Animations from "../generic/animations"

export const tab_info = function () {
  return tab({
    image: Animations.TAB_INFO,
    content: []
  })
}

import {
  window, label, dropdown
} from "openrct2-flexui"
import { language, languageList } from "../languages";
import { dataStructure } from "../data";

let isOpen = false;
export function toolboxMenu() {
  const win_template = window({
    title: language.ui.toolbox.title,
    width: 200,
    height: 300,
    position: "center",
    content: [
      label({
        text: language.ui.toolbox.language_selection_label
      }),
      dropdown({
        items: languageList,
        selectedIndex: dataStructure.global.language_index,
        onChange: (index : number) => {
          dataStructure.global.language_index.set(index);
          win_template.close();
        }
      })
    ],
    onOpen: () => isOpen = true,
    onClose: () => isOpen = false
  });
  if (!isOpen)
    win_template.open();
  else
    win_template.focus();
}

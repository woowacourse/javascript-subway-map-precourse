import { menuIDs, menus, menuIndexArray } from "../constants/global.js";
import showElements from "../utils/display/show-elements.js";
import hideElements from "../utils/display/hide-elements.js";

export default function totalSubwayManageContainer() {
  for (const [index, child] of menus.entries()) {
    const elementToHide = menuIndexArray.filter(x => {
      return x !== index;
    });

    child.addEventListener("click", () => {
      showElements(menuIDs[index]);
      elementToHide.forEach(el => {
        hideElements(menuIDs[el]);
      });
    });
  }
}

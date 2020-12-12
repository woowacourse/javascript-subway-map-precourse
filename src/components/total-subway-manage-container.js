import showElements from "../utils/display/show-elements.js";
import hideElements from "../utils/display/hide-elements.js";

const menuIDs = {
  0: "manage-station",
  1: "manage-lines",
  2: "manage-sections",
  3: "manage-map-print",
};
const menus = document.querySelectorAll("#menu > button");
const menuIndexArray = [...Array(menus.length).keys()];

export default function totalSubwayManageContainer() {
  for (const [index, child] of menus.entries()) {
    const elementToHide = menuIndexArray.filter((x) => {
      return x !== index;
    });

    child.addEventListener("click", () => {
      showElements(menuIDs[index]);
      elementToHide.forEach((el) => {
        hideElements(menuIDs[el]);
      });
    });
  }
}

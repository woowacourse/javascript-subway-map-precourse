import stationManageContainer from "./station-manage-container.js";
import lineManageContainer from "./line-manage-container.js";
import sectionManageContainer from "./section-manage-container.js";
import mapPrintManageContainer from "./map-print-manage-container.js";

import { state } from "../index.js";
import { menuIDs } from "../global/innerHtml.js";

const menus = document.querySelectorAll("#menu > button");

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createDOM(index) {
  const html = menuIDs[index].html;
  const createdDOM = new DOMParser().parseFromString(html, "text/html");

  return createdDOM.body.firstChild;
}

function contentToShow(content, index) {
  content.appendChild(createDOM(index));

  if (index === 0) {
    new stationManageContainer(state);
  } else if (index === 1) {
    new lineManageContainer(state);
  } else if (index === 2) {
    new sectionManageContainer();
  } else if (index === 3) {
    new mapPrintManageContainer();
  }
}

export default function totalSubwayManageContainer() {
  const content = document.getElementById("content");

  for (const [index, child] of menus.entries()) {
    child.addEventListener("click", () => {
      removeAllChild(content);
      contentToShow(content, index);
    });
  }
}

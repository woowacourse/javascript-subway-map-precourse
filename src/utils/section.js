import { getDataFromLocalStorage } from "./data.js";
import {
  cleanPreView,
  controlDisplay,
  printSectionLineButton,
  printSectionAddDiv,
} from "./controlView.js";
import { SELECTION_DIV } from "../constant.js";

export function sectionAddButtonEventHandler(e) {
  console.log(this);
}

export function sectionAddButton(e) {
  const sectionAddButton = document.getElementById("section-add-button");
  sectionAddButton.addEventListener(
    "click",
    sectionAddButtonEventHandler.bind(this)
  );
}

export function lineControlEventHandler(e) {
  printSectionAddDiv.call(
    this,
    document.getElementById("app").children[SELECTION_DIV],
    e.target.dataset.value
  ); //구간 등록 div 출력
}
export function sectionEventHandler(e) {
  const parentMenu = document.getElementById("app").children[SELECTION_DIV];
  getDataFromLocalStorage(this);
  controlDisplay(parentMenu);
  cleanPreView(SELECTION_DIV);
  printSectionLineButton.call(this, parentMenu.children[0]);
}

export function sectionInit() {
  const sectionManagerButton = document.getElementById(
    "section-manager-button"
  );
  sectionManagerButton.addEventListener(
    "click",
    sectionEventHandler.bind(this)
  );
}

import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { cleanPreView, controlDisplay } from "./controlView.js";
import { SELECTION_DIV } from "../constant.js";
export function sectionEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(SELECTION_DIV);
  controlDisplay(document.getElementById("app").children[SELECTION_DIV]);
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

import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { cleanPreView, controlDisplay } from "./controlView.js";
import { LINE_DIV } from "../constant.js";

export function lineEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(LINE_DIV);
  controlDisplay(document.getElementById("app").children[LINE_DIV]);
}
export function lineInit() {
  const lineManagerButton = document.getElementById("line-manager-button");
  lineManagerButton.addEventListener("click", lineEventHandler.bind(this));
}

import { getDataFromLocalStorage, getDataFromSelect } from "./data.js";
import {
  cleanPreView,
  controlDisplay,
  printSectionLineButton,
  printSectionAddDiv,
  printTable,
} from "./controlView.js";
import { ERR_MESSAGE_SECTION, SELECTION_DIV } from "../constant.js";

export function isValidSelectName(parent, lineIndex) {
  let selectedId = getDataFromSelect(parent, "id");
  const result = this.line[lineIndex].stations.filter(
    (v) => v.id === selectedId
  );
  return result.length === 0;
}

export function isValidOrder(lineIndex, sectionOrderInput) {
  if (
    sectionOrderInput > 0 &&
    sectionOrderInput < this.line[lineIndex].stations.length //순서번호가 인덱스 0~인덱스 길이 사이
  ) {
    return true;
  }
}

export function addStationtoLine(lineIndex, sectionOrderInput) {
  this.line[lineIndex].stations.splice(parseInt(sectionOrderInput), 0, {
    id: getDataFromSelect(sectionSelector, "id"),
    station: getDataFromSelect(sectionSelector, "value"),
  });
}

export function sectionAddButtonEventHandler(buttonName) {
  const sectionOrderInput = document.getElementById("section-order-input");
  const sectionSelector = document.getElementById("section-station-selector");
  let lineIndex = this.line.findIndex((v) => v.name === buttonName);
  if (
    isValidSelectName.call(this, sectionSelector, lineIndex) &&
    isValidOrder.call(this, lineIndex, sectionOrderInput.value)
  ) {
    addStationtoLine.call(this, lineIndex, sectionOrderInput.value);
    printTable.call(this, SELECTION_DIV, buttonName);
    sectionOrderInput.value = "";
  } else {
    alert(ERR_MESSAGE_SECTION);
    sectionOrderInput.value = "";
  }
}

export function sectionAddButton(buttonName) {
  const sectionAddButton = document.getElementById("section-add-button");
  sectionAddButton.addEventListener(
    "click",
    sectionAddButtonEventHandler.bind(this, buttonName)
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

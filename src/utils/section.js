import {
  getDataFromLocalStorage,
  getDataFromSelect,
  setDataToStorage,
} from "./data.js";
import {
  cleanPreView,
  controlDisplay,
  printSectionLineButton,
  printSectionAddDiv,
  printTable,
} from "./controlView.js";
import {
  ERR_MESSAGE_SECTION,
  SELECTION_DIV,
  DELETE_MESSAGE,
  ERR__DELETE,
  SELECTION_DELETE_COUNT_LIMIT,
} from "../constant.js";
import { addLinetoStation } from "./line.js";

export function removeSectionHandler(e) {
  if (confirm(DELETE_MESSAGE)) {
    const tr = e.target.parentNode.parentNode;
    let index = this.line.findIndex((v) => v.id === tr.dataset.sectionid);
    if (this.line[index].stations.length >= SELECTION_DELETE_COUNT_LIMIT) {
      const clearSection = this.line[index].stations.filter(
        (v) => v.id !== tr.dataset.id
      );
      this.line[index].stations = clearSection;
      setDataToStorage(this);
      printTable.call(this, SELECTION_DIV, this.line[index].name);
    } else {
      alert(ERR__DELETE);
    }
  }
}

export function isValidSelectName(lineIndex) {
  //같은 역이 인지 확인
  const sectionSelector = document.getElementById("section-station-selector");
  let selectedId = getDataFromSelect(sectionSelector, "id");
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
  const sectionSelector = document.getElementById("section-station-selector");
  const stationId = getDataFromSelect(sectionSelector, "id");
  this.line[lineIndex].stations.splice(parseInt(sectionOrderInput), 0, {
    id: stationId,
    station: getDataFromSelect(sectionSelector, "value"),
  });
  addLinetoStation.call(this, this.line[lineIndex].id, stationId); //역에 노선 id 추가
}

export function sectionAddButtonEventHandler(buttonName) {
  const sectionOrderInput = document.getElementById("section-order-input");
  let lineIndex = this.line.findIndex((v) => v.name === buttonName);
  if (
    isValidSelectName.call(this, lineIndex) &&
    isValidOrder.call(this, lineIndex, sectionOrderInput.value)
  ) {
    addStationtoLine.call(this, lineIndex, sectionOrderInput.value);
    setDataToStorage(this);
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

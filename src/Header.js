import {
  addClickEventFromId,
  renderLineTable,
  renderStationTable,
  putOptionsFromId,
  renderSectionSelector,
  combineMap,
} from "./utils/dom.js";
import { getStateFromStorage } from "./utils/storage.js";
import * as storageKey from "./constants/storageKey.js";

const menuIds = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];

export default class Header {
  constructor() {
    this.clickMenuEventListener();
  }

  clickMenuEventListener() {
    menuIds.forEach((id) => {
      addClickEventFromId(id, () => {
        this.hideContentChildren();
        this.renderContent(id);
      });
    });
  }

  hideContentChildren() {
    const contentChildren = Array.from(
      document.getElementById("content").children
    );
    contentChildren.forEach((el) => (el.style.display = "none"));
    const mapContent = document.getElementsByClassName("map")[0];
    if (mapContent !== undefined) {
      mapContent.remove();
    }
  }

  renderContent(id) {
    const isMap = Boolean(id.match("map"));
    if (isMap) {
      this.renderMapContent();
      return;
    }
    const isLine = Boolean(id.match("line"));
    if (isLine) {
      putOptionsFromId("line-start-station-selector");
      putOptionsFromId("line-end-station-selector");
      renderLineTable();
    }
    const isStation = Boolean(id.match("station"));
    if (isStation) {
      renderStationTable();
    }
    const isSection = Boolean(id.match("section"));
    if (isSection) {
      renderSectionSelector();
    }
    const content = document.getElementById(id.replace("button", "content"));
    content.style.display = "block";
  }

  renderMapContent() {
    const lines = getStateFromStorage(storageKey.LINES);
    if (!lines) {
      return;
    }
    const newEl = document.createElement("div");
    newEl.setAttribute("class", "map");
    newEl.innerHTML = Object.entries(lines).reduce(combineMap, "");
    const contentEl = document.getElementById("content");
    contentEl.appendChild(newEl);
  }
}

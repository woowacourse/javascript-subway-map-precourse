import { addClickEventFromId } from "./utils/dom.js";
import { getStationOptions } from "./utils/line.js";

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

  putOptions() {
    const startStationSeletor = document.getElementById(
      "line-start-station-selector"
    );
    const endStationSelector = document.getElementById(
      "line-end-station-selector"
    );
    startStationSeletor.innerHTML = getStationOptions();
    endStationSelector.innerHTML = getStationOptions();
  }

  renderContent(id) {
    const isMap = Boolean(id.match("map"));
    if (isMap) {
      this.renderMapContent();
      return;
    }
    const isLine = Boolean(id.match("line"));
    if (isLine) {
      this.putOptions();
    }
    const content = document.getElementById(id.replace("button", "content"));
    content.style.display = "block";
  }

  renderMapContent() {
    const newEl = document.createElement("div");
    newEl.setAttribute("class", "map");
    newEl.innerHTML = "노선 출력 내용";
    const contentEl = document.getElementById("content");
    contentEl.appendChild(newEl);
  }
}

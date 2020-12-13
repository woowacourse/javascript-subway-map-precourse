import Station from "./station.js";
import Line from "./line.js";
import { createCustomElement, createSelect } from "./table.js";
class Section {
  constructor() {
    this.stations = Station.stations;
    this.lines = Line.lines;
    this.showMenuButton();
    this.resetSection();
  }

  resetSection = () => {
    const sectionInput = document.getElementById("sect-main-contents");
    sectionInput.style.display = "none";
    this.showStationSelect();
  };

  showStationSelect = () => {
    const select = document.getElementById("section-station-select");
    createSelect(select, this.stations);
  };

  showMenuButton = () => {
    const sectionMenuContainer = document.getElementById("sect-menus");
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const button = document.createElement("button");
      button.innerHTML = Object.keys(this.lines)[i];
      button.className = "section-line-menu-button";
      sectionMenuContainer.appendChild(button);
    }

    this.handleMenuButton();
  };

  showSectionInput = lineName => {
    const sectionName = document.querySelector(".sect-main h2");
    sectionName.innerHTML = `${lineName} 관리`;

    const sectionInput = document.getElementById("sect-main-contents");
    sectionInput.style.display = "block";
  };

  showSectionLine = e => {
    const lineName = e.target.innerHTML;
    this.showSectionInput(lineName);
    this.showSectionTable();
  };

  handleMenuButton = () => {
    const sectionMenuBtns = document.getElementsByClassName(
      "section-line-menu-button"
    );
    for (let i = 0; i < sectionMenuBtns.length; i++) {
      sectionMenuBtns[i].addEventListener("click", this.showSectionLine);
    }
  };
}

export default new Section();

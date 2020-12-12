import StationManager from "./StationManager.js";
import LineManager from "./LineManager.js";
import SectionManager from "./SectionManager.js";
import MapPrintManager from "./MapPrintManager.js";

class App {
  constructor() {
    this.$app = document.querySelector("#app");

    this.$nav = document.createElement("nav");
    this.$nav.append(...this.createNavButtonArray());
    
    this.$main = document.createElement("main");

    this.$app.append(this.$nav, this.$main);
  }

  createNavButtonArray() {
    const $stationManagerButton = this.createStationManagerButton();
    const $lineManagerButton = this.createLineManagerButton();
    const $sectionManagerButton = this.createSectionManagerButton();
    const $mapPrintManagerButton = this.createMapPrintManagerButton();

    return [
      $stationManagerButton,
      $lineManagerButton,
      $sectionManagerButton,
      $mapPrintManagerButton
    ];
  }

  createStationManagerButton() {
    return this.createButtonHTMLElement({
      id: "station-manager-button",
      name: "1. 역 관리",
      onClick: () => {
        console.log("show stationManager");
        this.$main.innerHTML = "";
        new StationManager({ $parent: this.$main });
      },
    });
  }

  createLineManagerButton() {
    return this.createButtonHTMLElement({
      id: "line-manager-button",
      name: "2. 노선 관리",
      onClick: () => {
        console.log("show stationManager");
        this.$main.innerHTML = "";
        new LineManager({ $parent: this.$main });
      },
    });
  }

  createSectionManagerButton() {
    return this.createButtonHTMLElement({
      id: "section-manager-button",
      name: "3. 구간 관리",
      onClick: () => {
        console.log("show sectionManager");
        this.$main.innerHTML = "";
        new SectionManager({ $parent: this.$main });
      },
    });
  }

  createMapPrintManagerButton() {
    return this.createButtonHTMLElement({
      id: "map-print-manager-button",
      name: "4. 지하철 노선도 출력",
      onClick: () => {
        console.log("show mapPrintManager");
        this.$main.innerHTML = "";
        new MapPrintManager({ $parent: this.$main });
      },
    });
  }

  createButtonHTMLElement({ id, name, onClick }) {
    const button = document.createElement("button");
    button.innerText = name;
    button.id = id;
    button.addEventListener("click", onClick);

    return button;
  }
}

new App();
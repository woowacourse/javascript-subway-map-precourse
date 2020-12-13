import { StationManager } from "./stationManager/stationManager.js"
import { LineManager } from "./lineManager/lineManager.js"
import { MapManager } from "./mapManager/mapManager.js"
import { SectionManager } from "./sectionManager/sectionManager.js"

export default class SubwayManager {
    constructor() {
        this.addEventTostationManagerButton();
        this.addEventToLineManagerButton();
        this.addEventToMapManagerButton();
        this.addEventToSectionManagerButton();
    }

    addEventTostationManagerButton() {
        document.querySelector("#station-manager-button").addEventListener("click", () => {
            if (document.querySelector("#station-manager-div")) {
                return;
            }
            LineManager.hide();
            SectionManager.hide();
            MapManager.hide();
            StationManager.show();
        })
    }

    addEventToLineManagerButton() {
        document.querySelector("#line-manager-button").addEventListener("click", () => {
            if (document.querySelector("#line-manager-div")) {
                return;
            }
            StationManager.hide()
            SectionManager.hide();
            MapManager.hide();
            LineManager.show();
        })
    }

    addEventToMapManagerButton() {
        document.querySelector("#map-print-manager-button").addEventListener("click", () => {
            if (document.querySelector(".map")) {
                return;
            }
            StationManager.hide();
            LineManager.hide();
            SectionManager.hide();
            MapManager.show();
        })
    }

    addEventToSectionManagerButton() {
        document.querySelector("#section-manager-button").addEventListener("click", () => {
            if (document.querySelector("#section-manager-div")) {
                return;
            }
            StationManager.hide();
            LineManager.hide();
            MapManager.hide();
            SectionManager.show();
        })
    }
}

new SubwayManager()
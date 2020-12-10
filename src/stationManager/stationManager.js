import { addResultToBody, makeStationHTML, addStationNameToTable, stationNameInputClear } from "./stationManagerOutputView.js"
import { getInputIfPossible } from "./stationNameInputUtil.js"
import { Data } from "../data.js"

export class StationManager {
    constructor() {
        this.HTML = makeStationHTML(Data.getStationNameData())
        addResultToBody(this.HTML);
        this.addEventToAddStationButton()
    }

    addEventToAddStationButton = () => {
        const addStationButton = document.querySelector("#station-add-button");
        addStationButton.addEventListener("click", () => {
            try {
                const stationName = getInputIfPossible();
                Data.addStation(stationName);
                addStationNameToTable(stationName);
                stationNameInputClear();
            } catch (error) {
                alert(error)
            }
        })
    }
}
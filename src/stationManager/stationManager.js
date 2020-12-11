import {
    addResultToBody,
    makeStationHTML,
    addStationNameToTable,
    stationNameInputClear,
    removeStationManagerHTML
} from "./stationManagerView.js"
import { makeStationIfPossible } from "../stationFactory.js"
import { Data } from "../data.js"

export class StationManager {

    static show = () => {
        addResultToBody(makeStationHTML(Data.getStationRepository()));
        addEventToAddStationButton()
    }

    static hide = () => {
        removeStationManagerHTML();
    }

}

const addEventToAddStationButton = () => {
    const addStationButton = document.querySelector("#station-add-button");
    const addStaitonInput = document.querySelector("#station-name-input");

    addStationButton.addEventListener("click", () => {
        try {
            const station = makeStationIfPossible(addStaitonInput.value);
            Data.addStation(station);
            addStationNameToTable(station.name);
            stationNameInputClear();
        } catch (error) {
            alert(error)
        }
    });
}
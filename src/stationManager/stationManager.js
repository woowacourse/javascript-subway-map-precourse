import {
    addResultToBody,
    makeStationHTML,
    removeStationManagerHTML
} from "./stationView.js"
import { makeStationIfPossible, checkStationInLine } from "./stationController.js"
import { alertText } from "../text.js"
import { Data } from "../data.js"

export class StationManager {

    static show = () => {
        addResultToBody(makeStationHTML(Data.getStationRepository()));
        addEventToAddStationButton();
        addEventToDeleteButton();
    }

    static hide = () => {
        removeStationManagerHTML();
    }

}

const addEventToAddStationButton = () => {
    document.querySelector("#station-add-button").addEventListener("click", () => {
        try {
            Data.addStation(makeStationIfPossible(document.querySelector("#station-name-input").value));
            updateStationView();
        } catch (error) {
            alert(error);
        }
    });
}

const addEventToDeleteButton = () => {
    Array.prototype.forEach.call(document.querySelectorAll(".station-delete-button"), (button) => {
        button.addEventListener("click", function (button) {
            const stationName = button.target.parentNode.parentNode.dataset.stationName;
            try {
                checkStationInLine(stationName);
                if (confirm(alertText.CONFIRM_MESSAGE)) {
                    Data.removeStation(stationName);
                    document.querySelector("#station-name-table tbody").removeChild(this.parentElement.parentElement);
                }
            } catch (error) {
                alert(error);
            }
        })
    })
}

const updateStationView = () => {
    removeStationManagerHTML();
    addResultToBody(makeStationHTML(Data.getStationRepository()));
    addEventToAddStationButton();
    addEventToDeleteButton();
}
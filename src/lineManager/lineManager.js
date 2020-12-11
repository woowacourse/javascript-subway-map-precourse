import { Data } from "../data.js"
import { makeLineIfPossible } from "../lineFactory.js"
import {
    makeLineManagerHTML,
    addLineHTMLtoBody,
    removeLineHTML,
    addLineToTable
} from "./lineManagerView.js"

export class LineManager {

    static hide = () => {
        removeLineHTML();
    }

    static show = () => {
        addLineHTMLtoBody(makeLineManagerHTML(Data.getStationRepository(), Data.getLineRepository()));
        addEventToLineAddButton();
    }
}

const addEventToLineAddButton = () => {
    const lineAddButton = document.querySelector("#line-add-button");

    lineAddButton.addEventListener("click", () => {
        const lineNameInput = document.querySelector("#line-name-input").value;
        const selectedStartStation = getSelectedStation("start");
        const selectedEndStation = getSelectedStation("end");

        getInputAndAddLine(lineNameInput, selectedStartStation, selectedEndStation);
        addLineToTable(lineNameInput, selectedStartStation, selectedEndStation);
    })
}

const getInputAndAddLine = (lineNameInput, selectedStartStation, selectedEndStation) => {
    Data.addLine(makeLineIfPossible(lineNameInput, selectedStartStation, selectedEndStation));
}

const getSelectedStation = (startOrEnd) => {
    const selectOption = document.getElementById(`line-${startOrEnd}-station-selector`)
    return selectOption.options[selectOption.selectedIndex].value;
}
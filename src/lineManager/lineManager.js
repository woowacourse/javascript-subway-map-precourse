import { Data } from "../data.js"
import { makeLineIfPossible } from "./lineController.js"
import { alertText } from "../text.js"
import {
    makeLineHTML,
    showLineHTML,
    hideLineHTML
} from "./lineView.js"

export class LineManager {

    static hide = () => {
        hideLineHTML();
    }

    static show = () => {
        showLineHTML(makeLineHTML(Data.getStationRepository(), Data.getLineRepository()));
        addEventToLineAddButton();
        addEventToDeleteButton();
    }

}

const addEventToLineAddButton = () => {
    const lineAddButton = document.querySelector("#line-add-button");

    lineAddButton.addEventListener("click", () => {
        const lineName = document.querySelector("#line-name-input").value;
        const startStation = getSelectedStation("start");
        const endStation = getSelectedStation("end");

        getInputAndAddLine(lineName, startStation, endStation);
    });
}

const getInputAndAddLine = (lineName, startStation, endStation) => {
    Data.addLine(makeLineIfPossible(lineName, startStation, endStation));
    hideLineHTML();
    showLineHTML(makeLineHTML(Data.getStationRepository(), Data.getLineRepository()));
    addEventToLineAddButton();
    addEventToDeleteButton();
}

const getSelectedStation = (startOrEnd) => {
    const selectOption = document.getElementById(`line-${startOrEnd}-station-selector`)
    return selectOption.options[selectOption.selectedIndex].value;
}


const addEventToDeleteButton = () => {
    let deleteButtons = document.querySelectorAll(".line-delete-button")

    Array.prototype.forEach.call(deleteButtons, function (button) {
        button.addEventListener("click", function (button) {
            if (confirm(alertText.CONFIRM_MESSAGE)) {
                Data.removeLine(button.target.parentNode.parentNode.dataset.lineName);
                document.querySelector("#line-table tbody").removeChild(this.parentElement.parentElement);
            }
        })
    })

}
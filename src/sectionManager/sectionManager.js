import { templateLineButtonHTML, removeSubSectionHTML, removeSectionHTML, templateSectionHTML } from "./sectionView.js"
import { checkSection, checkStationArrayLengths } from "./sectionController.js"
import { Data } from "../data.js"
import { alertText } from "../text.js"
export class SectionManager {

    static show = () => {
        templateLineButtonHTML(Data.getLineRepository());
        addEventToLineButton();
    }

    static hide = () => {
        removeSectionHTML();
    }
}


const addEventToLineButton = () => {
    Array.prototype.forEach.call(document.querySelectorAll(".section-line-menu-button"), (button) => {
        button.addEventListener("click", (button) => {
            removeSubSectionHTML();
            templateSectionHTML(button.target.dataset.selectedLine, Data.getStationRepository());
            addEventToRegisterButton(button.target.dataset.selectedLine)
            addEventToRemoveButton(button.target.dataset.selectedLine)
        })
    })
}

const addEventToRegisterButton = (lineName) => {
    document.querySelector("#section-add-button").addEventListener("click", () => {
        const order = document.querySelector("#section-order-input").value
        const station = getSelectedStation();

        try {
            Data.insertStationToLine(...checkSection(lineName, order, station));
            updateSectionHTML(lineName);
        } catch (error) {
            alert(error);
        }
    });

}

const getSelectedStation = () => {
    const selectOption = document.querySelector(`#section-station-selector`)
    return selectOption.options[selectOption.selectedIndex].value;
}

const addEventToRemoveButton = (lineName) => {
    Array.prototype.forEach.call(document.querySelectorAll(".section-delete-button"), (button) => {
        button.addEventListener("click", (button) => {
            try {
                checkStationArrayLengths(lineName);
                if (confirm(alertText.CONFIRM_MESSAGE)) {
                    Data.removeStationFromLine(lineName, button.target.parentNode.parentNode.dataset.selectedIndex);
                    updateSectionHTML(lineName);
                }
            } catch (error) {
                alert(error);
            }
        })
    })
}

const updateSectionHTML = (lineName) => {
    removeSubSectionHTML();
    templateSectionHTML(lineName, Data.getStationRepository());
    addEventToRegisterButton(lineName)
    addEventToRemoveButton(lineName);
}
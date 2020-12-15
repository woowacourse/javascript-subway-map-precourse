import {setPage, addTableRow, setSectionLineElement} from "./View/section-manager-view.js";
import {addElement, addClickEventInButtons} from "./common/elements.js";
import { 
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue,
    deleteItem
} from "./common/items.js";
import words from "./common/words.js";

export default class SectionManager {
    constructor() {
        this.sectionTableTbody;
        this.lineName;
        setPage();
        this.setSectionLineMenuButton();
     }

    setTableContent() {
        const sectionList = getItemList(this.lineName);
        this.sectionTableTbody = document.querySelector(`#${words.SECTION_TABLE_TBODY}`);
        this.sectionTableTbody.innerHTML = "";
        if(sectionList.length > 0) {
            sectionList.forEach(section => {
                addTableRow(section, this.sectionTableTbody);
            });
            addClickEventInButtons(words.SECTION_DELETE_BUTTON, this.confirmDeleteSection.bind(this), false);
        }
    }

    deleteSection(deleteRow) {
        deleteItem(this.lineName, deleteRow.dataset.sectionName);
        this.sectionTableTbody.removeChild(deleteRow);
        this.setTableContent();
    }

    decideDeleteSection(deleteButton) {
        const deleteRow = deleteButton.parentElement.parentElement;
        if(this.sectionTableTbody.childElementCount <= 2) {
            alert(words.SECTION_STATION_NO_DELETE_ALERT);
        }
        else {
            this.deleteSection(deleteRow);
        }
    }

    confirmDeleteSection(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        if(isConfirm) {
            this.decideDeleteSection(deleteButton);
        }
    }

    getAlertText(order) {
        const tableRowCount =this.sectionTableTbody.childElementCount;
        let text = "";
        if(isEmpty(order)) {
            text = words.SECTION_STATION_ORDER_INPUT_ALERT;
        }
        else if(order < 0 || order > tableRowCount) {
            text = `0~${tableRowCount} ${words.SECTION_STATION_ORDER_CORRECT_ALERT}`;
        }
        return text;
    }

    addSectionInLine(sectionStationName, order) {
        if(addItem(this.lineName, sectionStationName, order)) {
            this.setTableContent();
        }
        else {
            alert(`${sectionStationName}${words.SECTION_STATION_DUPLICATE_ALERT}`);
        }
    }

    addSection() {
        const order = removeWhiteSpaceValue(document.getElementById(words.SECTION_ORDER_INPUT).value);
        const sectionStationSelector = document.getElementById(words.SECTION_STATION_SELECTOR);
        const sectionStationName = sectionStationSelector.options[sectionStationSelector.selectedIndex].value;
        const alertText = this.getAlertText(order);
        alertText === "" ? this.addSectionInLine(sectionStationName, order) : alert(alertText);
    }
   
    setSectionLineMenuButton() {
        const lineList = getItemList(words.LINES);
        if(lineList.length > 0) {
            lineList.forEach(line => {
                addElement("button", line, "class", words.SECTION_LINE_MENU_BUTTON, null);
            });
            addClickEventInButtons(words.SECTION_LINE_MENU_BUTTON, setSectionLineElement.bind(this), false);
        }
        addElement("div", null, "id", words.SECTION_MANAGEMENT_PART, null);
    }
}
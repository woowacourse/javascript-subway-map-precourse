import {
    addElement, 
    addInputElement,
    addTableElement,
    addSelectElement, 
    addClickEventListener, 
    pageInit,
    addClickEventInButtons
} from "./common/elements.js";
import { 
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue,
    deleteItem,
    isDuplicateItem
} from "./common/items.js";
import words from "./common/words.js";

export default class SectionManager {
    constructor() {
        this.sectionTableTbody;
        this.lineName;
        this.setPage();
        this.setSectionLineMenuButton();
     }

    setPage() {
        pageInit();
        addElement("h3", words.SECTION_LINE_SELECT_TEXT, null, null, null);
    }

    addTableRow(section) {
        const row = this.sectionTableTbody.insertRow();
        row.setAttribute("data-section-name", section);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = this.sectionTableTbody.childElementCount - 1;
        cell2.innerHTML = section;
        addElement("button", words.SECTION_DELETE_TEXT, "class", words.SECTION_DELETE_BUTTON, cell3);
    }

    setTableContent() {
        const sectionList = getItemList(this.lineName);
        this.sectionTableTbody.innerHTML = "";
        if(sectionList !== null) {
            sectionList.forEach(section => {
                this.addTableRow(section);
            });
            addClickEventInButtons(words.SECTION_DELETE_BUTTON, this.confirmDeleteSection.bind(this), false);
        }
    }

    deleteSection(deleteButton) {
        const deleteRow = deleteButton.parentElement.parentElement;
        deleteItem(this.lineName, deleteRow.dataset.sectionName);
        this.sectionTableTbody.removeChild(deleteRow);
        this.setTableContent();
    }

    confirmDeleteSection(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        if(isConfirm) {
            if(this.sectionTableTbody.childElementCount <= 2) {
                alert(words.SECTION_STATION_NO_DELETE_ALERT);
            }
            else {
                this.deleteSection(deleteButton);
            }
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
        const alertText = this.getAlertText(order);
        if(alertText === "") {
            if(addItem(this.lineName, sectionStationName, order)) {
                this.setTableContent();
            }
            else {
                alert(`${sectionStationName}${words.SECTION_STATION_DUPLICATE_ALERT}`);
            }
        }
        else {
            alert(alertText);
        }
    }

    addSection() {
        const order = removeWhiteSpaceValue(document.getElementById(words.SECTION_ORDER_INPUT).value);
        const sectionStationSelector = document.getElementById(words.SECTION_STATION_SELECTOR);
        const sectionStationName = sectionStationSelector.options[sectionStationSelector.selectedIndex].value;
        this.addSectionInLine(sectionStationName, order);
    }

    setSectionLineElement(menuButton) {
        const sectionManagementPart = document.getElementById(words.SECTION_MANAGEMENT_PART);
        this.lineName = menuButton.innerText;
        sectionManagementPart.innerHTML = "";
        addElement("h3", `${this.lineName} ${words.MANAGEMENT}`, null, null, sectionManagementPart);
        addElement("h4", words.SECTION_ADD_TEXT, "id", words.SECTION_ADD_TEXT_ID, sectionManagementPart);
        addSelectElement(words.SECTION_STATION_SELECTOR, sectionManagementPart);
        addInputElement(words.SECTION_ORDER_INPUT, words.ORDER, sectionManagementPart);
        addElement("button", words.ENROLLMENT, "id", words.SECTION_ADD_BUTTON, sectionManagementPart);
        addElement("p", null, null, null, sectionManagementPart);
        addTableElement([words.ORDER, words.NAME, words.SETTING], words.SECTION_TABLE_TBODY, sectionManagementPart);
        addClickEventListener(document.getElementById(words.SECTION_ADD_BUTTON), () => {this.addSection()});
        this.sectionTableTbody = document.querySelector(`#${words.SECTION_TABLE_TBODY}`);
        this.setTableContent();
    }
   
    setSectionLineMenuButton() {
        const lineList = getItemList(words.LINES);
        if(lineList !== null) {
            lineList.forEach(line => {
                addElement("button", line, "class", words.SECTION_LINE_MENU_BUTTON, null);
            });
            addClickEventInButtons(words.SECTION_LINE_MENU_BUTTON, this.setSectionLineElement.bind(this), false);
        }
        addElement("div", null, "id", words.SECTION_MANAGEMENT_PART, null);
    }
}
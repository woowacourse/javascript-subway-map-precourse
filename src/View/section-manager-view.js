import {
    addElement, 
    addInputElement,
    addTableElement,
    addSelectElement, 
    addClickEventListener, 
    pageInit
} from "../common/elements.js";
import words from "../common/words.js";

export function setPage() {
    pageInit();
    addElement("h3", words.SECTION_LINE_SELECT_TEXT, null, null, null);
}

export function addTableRow(section, sectionTableTbody) {
    const row = sectionTableTbody.insertRow();
    row.setAttribute("data-section-name", section);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = sectionTableTbody.childElementCount - 1;
    cell2.innerHTML = section;
    addElement("button", words.SECTION_DELETE_TEXT, "class", words.SECTION_DELETE_BUTTON, cell3);
}

export function setSectionLineElement(menuButton) {
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
    this.setTableContent();
}
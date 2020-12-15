import {
    addElement, 
    addInputElement,
    addTableElement,
    addSelectElement, 
    pageInit
} from "../common/elements.js"
import words from "../common/words.js";

export function setPage() {
    pageInit();
    addElement("h4", words.LINE_NAME, null, null, null);
    addInputElement(words.LINE_NAME_INPUT, words.LINE_INPUT_ALERT, null);
    addElement("h4", words.LINE_START_STATION, "class", words.LINE_STATION_TEXT, null);
    addSelectElement(words.LINE_START_STATION_SELECTOR, null);
    addElement("br", null, null, null, null);
    addElement("h4", words.LINE_END_STATION, "class", words.LINE_STATION_TEXT, null);
    addSelectElement(words.LINE_END_STATION_SELECTOR, null);
    addElement("p", null, null, null, null);
    addElement("button", words.LINE_ADD, "id",words.LINE_ADD_BUTTON, null);
    addElement("h2", words.LINE_LIST, null, null, null);
    addTableElement([words.LINE_NAME, `${words.LINE_START_STATION}역`, `${words.LINE_END_STATION}역`, words.SETTING], words.LINE_TABLE_TBODY, null);
}

export function addTableRow(lineName, lineStartStationName, lineEndStationName) {
    const lineTableTbody = document.getElementById(words.LINE_TABLE_TBODY);
    const row = lineTableTbody.insertRow();
    row.setAttribute("data-line-name", lineName);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = lineName;
    cell2.innerHTML = lineStartStationName;
    cell3.innerHTML = lineEndStationName;
    addElement("button", words.DELETE, "class", words.LINE_DELETE_BUTTON, cell4);
}
import {
    addElement, 
    addInputElement,
    addTableElement, 
    pageInit,
} from "../common/elements.js";
import words from "../common/words.js";

export function setPage() {
    pageInit();
    addElement("h4", words.STATION_NAME, null, null, null);
    addInputElement(words.STATION_NAME_INPUT, words.STATION_INPUT_ALERT, null);
    addElement("button", words.STATION_ADD, "id", words.STATION_ADD_BUTTON, null);
    addElement("h2", words.STATION_LIST, null, null, null);
    addTableElement([words.STATION_NAME, words.SETTING], words.STATION_TABLE_TBODY, null);
}

export function addTableRow(station) {
    const stationTableTbody = document.getElementById(words.STATION_TABLE_TBODY);
    const row = stationTableTbody.insertRow();
    row.setAttribute("data-station-name", station);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = station;
    addElement("button", words.DELETE, "class", words.STATION_DELETE_BUTTON, cell2);
} 
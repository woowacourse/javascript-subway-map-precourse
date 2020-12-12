import {
    addElement, 
    addInputElement,
    addTableElement,
    addSelectElement, 
    addClickEventListener, 
    pageInit,
    addClickEventInDeleteButton
} from "./common/elements.js";
import { 
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue 
} from "./common/items.js";
import words from "./common/words.js";

export default class LineManager {
    constructor() {
        this.setPage();
        this.lineTableTbody = document.getElementById("line-table-tbody");
        // this.setTableContent();
       addClickEventListener(document.getElementById(words.LINE_ADD_BUTTON), () => {this.addLine()});
    }

    setPage() {
        pageInit();
        addElement("h4", words.LINE_NAME, null, null, null);
        addInputElement(words.LINE_NAME_INPUT, words.LINE_INPUT_ALERT);
        addElement("h4", words.LINE_START_STATION, "class", words.LINE_STATION_TEXT, null);
        addSelectElement(words.LINE_START_STATION_SELECTOR);
        addElement("br", null, null, null, null);
        addElement("h4", words.LINE_END_STATION, "class", words.LINE_STATION_TEXT, null);
        addSelectElement(words.LINE_END_STATION_SELECTOR);
        addElement("p", null, null, null, null);
        addElement("button", words.LINE_ADD, "id",words.LINE_ADD_BUTTON, null);
        addElement("h2", words.LINE_LIST, null, null, null);
        addTableElement([words.LINE_NAME, `${words.LINE_START_STATION}역`, `${words.LINE_END_STATION}역`, words.SETTING], words.LINE_TABLE_TBODY);
    }

    addLineSection(stationInputName, lineStartStationName, lineEndStationName) {
        const itemList = [lineStartStationName, lineEndStationName];
        localStorage.setItem(stationInputName, JSON.stringify(itemList));
    }

    addLineInTable(stationInputName) {
        const lineStartStationSelector = document.getElementById(words.LINE_START_STATION_SELECTOR);
        const lineEndStationSelector = document.getElementById(words.LINE_END_STATION_SELECTOR);
        const lineStartStationName = lineStartStationSelector.options[lineStartStationSelector.selectedIndex].value;
        const lineEndStationName = lineEndStationSelector.options[lineEndStationSelector.selectedIndex].value;
        const row = this.lineTableTbody.insertRow(this.lineTableTbody.length);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = stationInputName;
        cell2.innerHTML = lineStartStationName;
        cell3.innerHTML = lineEndStationName;
        addElement("button", words.DELETE, "class", words.LINE_DELETE_BUTTON, cell4);
        this.addLineSection(stationInputName, lineStartStationName, lineEndStationName);
    }

    setAlert(stationInputName) {
        let isCorrect = true;
        if(!isEmpty(stationInputName)) {
            alert(words.LINE_INPUT_ALERT);
            isCorrect = false;
        }
        return isCorrect;
    }

    addLine() {
        const lineInputName = removeWhiteSpaceValue(document.getElementById(words.LINE_NAME_INPUT).value);
        if(this.setAlert(lineInputName)) {
            if(addItem(words.LINES, lineInputName)) {
                this.addLineInTable(lineInputName);
            }
            else {
                alert(`${lineInputName}${words.LINE_DUPLICATE_ALERT}`);
            }
        }
    }
}
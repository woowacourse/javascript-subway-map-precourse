import {
    addElement, 
    addInputElement,
    addTableElement,
    addSelectElement, 
    addClickEventListener, 
    pageInit,
    addClickEventInDeleteButton
} from "./common/elements.js?ver=24";
import { 
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue,
    deleteKey, 
    deleteItem
} from "./common/items.js?ver=15";
import words from "./common/words.js?ver=1";

export default class LineManager {
    constructor() {
        this.setPage();
        this.lineTableTbody = document.getElementById(words.LINE_TABLE_TBODY);
        this.setTableContent();
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
   
    deleteLine(deleteButton) {
        const deleteRow = deleteButton.parentElement.parentElement;
        const lineName = deleteRow.dataset.lineName;
        this.lineTableTbody.removeChild(deleteRow);
        deleteKey(lineName);
        deleteItem(words.LINES, lineName);
        if(this.lineTableTbody.childElementCount === 0) {
            deleteKey(words.LINES);
        }
    }

    confirmDeleteLine(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        if(isConfirm) {
            this.deleteLine(deleteButton);
        }
    }

    addTableRow(lineName, lineStartStationName, lineEndStationName) {
        const row = this.lineTableTbody.insertRow(this.lineTableTbody.length);
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

    setTableContent() {
        const lineList = getItemList(words.LINES);
        if(lineList !== null) {
            lineList.forEach(line => {
                const lineSectionList = getItemList(line);
                this.addTableRow(line, lineSectionList[0], lineSectionList[lineSectionList.length - 1]);
            });
            addClickEventInDeleteButton(words.LINE_DELETE_BUTTON, this.confirmDeleteLine.bind(this), false);
        }
    }

    addLineSection(lineInputName, lineStartStationName, lineEndStationName) {
        const itemList = [lineStartStationName, lineEndStationName];
        localStorage.setItem(lineInputName, JSON.stringify(itemList));
    } 

    addLineInTable(lineInputName) {
        const lineStartStationSelector = document.getElementById(words.LINE_START_STATION_SELECTOR);
        const lineEndStationSelector = document.getElementById(words.LINE_END_STATION_SELECTOR);
        const lineStartStationName = lineStartStationSelector.options[lineStartStationSelector.selectedIndex].value;
        const lineEndStationName = lineEndStationSelector.options[lineEndStationSelector.selectedIndex].value;
        this.addTableRow(lineInputName, lineStartStationName, lineEndStationName);
        this.addLineSection(lineInputName, lineStartStationName, lineEndStationName);
        addClickEventInDeleteButton(words.LINE_DELETE_BUTTON, this.confirmDeleteLine.bind(this), true);
    }

    getAlertText(lineInputName) {
        const lineStartStationSelector = document.getElementById(words.LINE_START_STATION_SELECTOR);
        const lineEndStationSelector = document.getElementById(words.LINE_END_STATION_SELECTOR);
        const lineStartStationName = lineStartStationSelector.options[lineStartStationSelector.selectedIndex].value;
        const lineEndStationName = lineEndStationSelector.options[lineEndStationSelector.selectedIndex].value;
        let text = "";
        if(!isEmpty(lineInputName)) {
            text = words.LINE_INPUT_ALERT;
        }
        else if(lineStartStationName === lineEndStationName) {
            text = words.LINE_SAME_STATION_ALERT;
        }
        return text;
    }

    addLine() {
        const lineInputName = removeWhiteSpaceValue(document.getElementById(words.LINE_NAME_INPUT).value);
        const alertText = this.getAlertText(lineInputName);
        if(alertText === "") {
            if(addItem(words.LINES, lineInputName)) {
                this.addLineInTable(lineInputName);
            }
            else {
                alert(`${lineInputName}${words.LINE_DUPLICATE_ALERT}`);
            }
        }
        else {
            alert(alertText);
        } 
    }
}
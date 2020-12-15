import {setPage, addTableRow} from "./View/line-manager-view.js";
import {addClickEventListener, addClickEventInButtons} from "./common/elements.js";
import { 
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue,
    deleteKey, 
    deleteItem
} from "./common/items.js";
import words from "./common/words.js";

export default class LineManager {
    constructor() {
        setPage();
        this.setTableContent();
        addClickEventListener(document.getElementById(words.LINE_ADD_BUTTON), () => {this.addLine()});
    }
   
    deleteLine(deleteButton) {
        const lineTableTbody = document.getElementById(words.LINE_TABLE_TBODY);
        const deleteRow = deleteButton.parentElement.parentElement;
        const lineName = deleteRow.dataset.lineName;
        lineTableTbody.removeChild(deleteRow);
        deleteKey(lineName);
        deleteItem(words.LINES, lineName);
        if(lineTableTbody.childElementCount === 0) {
            deleteKey(words.LINES);
        }
    }

    confirmDeleteLine(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        if(isConfirm) {
            this.deleteLine(deleteButton);
        }
    }

    setTableContent() {
        const lineList = getItemList(words.LINES);
        if(lineList.length > 0) {
            lineList.forEach(line => {
                const lineSectionList = getItemList(line);
                addTableRow(line, lineSectionList[0], lineSectionList[lineSectionList.length - 1]);
            });
            addClickEventInButtons(words.LINE_DELETE_BUTTON, this.confirmDeleteLine.bind(this), false);
        }
    }

    addLineSection(lineInputName, lineStartStationName, lineEndStationName) {
        const itemList = [lineStartStationName, lineEndStationName];
        localStorage.setItem(lineInputName, JSON.stringify(itemList));
    } 

    addLineInTable(lineInputName, lineStartStationName, lineEndStationName) {
        addTableRow(lineInputName, lineStartStationName, lineEndStationName);
        this.addLineSection(lineInputName, lineStartStationName, lineEndStationName);
        addClickEventInButtons(words.LINE_DELETE_BUTTON, this.confirmDeleteLine.bind(this), true);
    }

    getAlertText(lineInputName, lineStartStationName, lineEndStationName) {
        let text = "";
        if(isEmpty(lineInputName)) {
            text = words.LINE_INPUT_ALERT;
        }
        else if(lineStartStationName === lineEndStationName) {
            text = words.LINE_SAME_STATION_ALERT;
        }
        return text;
    }

    getLineStationName() {
        const lineStartStationSelector = document.getElementById(words.LINE_START_STATION_SELECTOR);
        const lineEndStationSelector = document.getElementById(words.LINE_END_STATION_SELECTOR);
        const lineStartStationName = lineStartStationSelector.options[lineStartStationSelector.selectedIndex].value;
        const lineEndStationName = lineEndStationSelector.options[lineEndStationSelector.selectedIndex].value;
        return [lineStartStationName, lineEndStationName];
    }

    addLineInStorage(lineInputName, lineStationName) {
        if(addItem(words.LINES, lineInputName, -1)) {
            this.addLineInTable(lineInputName, lineStationName[0], lineStationName[1]);
        }
        else {
            alert(`${lineInputName}${words.LINE_DUPLICATE_ALERT}`);
        }
    }

    addLine() {
        const lineInputName = removeWhiteSpaceValue(document.getElementById(words.LINE_NAME_INPUT).value);
        const lineStationName = this.getLineStationName();
        const alertText = this.getAlertText(lineInputName, lineStationName[0], lineStationName[1]);
        alertText === "" ? this.addLineInStorage(lineInputName, lineStationName) : alert(alertText);
    }
}
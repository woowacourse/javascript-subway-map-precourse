import {
    addElement, 
    addInputElement,
    addTableElement, 
    addClickEventListener, 
    pageInit,
    addClickEventInButtons
} from "./common/elements.js";
import {
    isEmpty,
    isDuplicateItem,
    addItem,
    getItemList,
    removeWhiteSpaceValue,
    deleteItem,
    deleteKey,
} from "./common/items.js";
import words from "./common/words.js";

export default class StationManager{
    constructor() {
       this.setPage();
       this.stationTableTbody = document.getElementById(words.STATION_TABLE_TBODY);
       this.setTableContent();
       addClickEventListener(document.getElementById(words.STATION_ADD_BUTTON), () => {this.addStation()});
    }

    setPage() {
        pageInit();
        addElement("h4", words.STATION_NAME, null, null, null);
        addInputElement(words.STATION_NAME_INPUT, words.STATION_INPUT_ALERT, null);
        addElement("button", words.STATION_ADD, "id", words.STATION_ADD_BUTTON, null);
        addElement("h2", words.STATION_LIST, null, null, null);
        addTableElement([words.STATION_NAME, words.SETTING], words.STATION_TABLE_TBODY, null);
    }
    
    deleteStation(stationName, deleteRow) {
        this.stationTableTbody.removeChild(deleteRow);
        deleteItem(words.STATIONS, stationName);
        if(this.stationTableTbody.childElementCount === 0) {
            deleteKey(words.STATIONS);
        }
    }

    isStationInLine(stationName) {
        const lineList = getItemList(words.LINES);
        let result = false;
        for(let i = 0; i < lineList.length; i++) {
            result = isDuplicateItem(lineList[i], stationName);
            if(result) {
                break;
            }
        }
        return result;
    }

    confirmDeleteStation(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        const deleteRow = deleteButton.parentElement.parentElement;
        const stationName = deleteRow.dataset.stationName;
        if(isConfirm) {
            if(this.isStationInLine(stationName)) {
                alert(`${stationName}${words.STATION_IN_LINE_ALERT}`);
            }
            else {
                this.deleteStation(stationName, deleteRow);
            }
        }
    }

    addTableRow(station) {
        const row = this.stationTableTbody.insertRow();
        row.setAttribute("data-station-name", station);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = station;
        addElement("button", words.DELETE, "class", words.STATION_DELETE_BUTTON, cell2);
    } 

    setTableContent() {
        const stationList = getItemList(words.STATIONS);
        if(stationList !== null) {
            stationList.forEach(station => {
                this.addTableRow(station);
            });
            addClickEventInButtons(words.STATION_DELETE_BUTTON, this.confirmDeleteStation.bind(this), false);
        }
    }

    addStationInTable(station) {
        this.addTableRow(station);
        addClickEventInButtons(words.STATION_DELETE_BUTTON, this.confirmDeleteStation.bind(this), true);
    }

    getAlertText(stationInputName) {
        let text = "";
        if(isEmpty(stationInputName)) {
            text = words.STATION_INPUT_ALERT;
        }
        else if(stationInputName.length < 2) {
            text = words.STATION_LENGTH_ALERT;
        }
        return text;
    }

    addStation() {
        const stationInputName = removeWhiteSpaceValue(document.getElementById(words.STATION_NAME_INPUT).value);
        const alertText = this.getAlertText(stationInputName);
        if(alertText === "") {
            if(addItem(words.STATIONS, stationInputName, -1)) {
                this.addStationInTable(stationInputName);
            }
            else {
                alert(`${stationInputName}${words.STATION_DUPLICATE_ALERT}`);
            }
        }
        else {
            alert(alertText);
        }
    }
}
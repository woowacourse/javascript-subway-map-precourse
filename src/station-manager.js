import {
    addElement, 
    addInputElement,
    addTableElement, 
    addClickEventListener, 
    pageInit,
    addClickEventInDeleteButton
} from "./common/elements.js";
import {
    isEmpty,
    addItem,
    getItemList,
    removeWhiteSpaceValue} 
from "./common/items.js";
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
        addInputElement(words.STATION_NAME_INPUT, words.STATION_INPUT_ALERT);
        addElement("button", words.STATION_ADD, "id", words.STATION_ADD_BUTTON, null);
        addElement("h2", words.STATION_LIST, null, null, null);
        addTableElement([words.STATION_NAME, words.SETTING], words.STATION_TABLE_TBODY);
    }

    // 수정해야함
    deleteStation() {
        alert("delete");
    }

    addTableRow(station) {
        const row = this.stationTableTbody.insertRow(this.stationTableTbody.length);
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
            addClickEventInDeleteButton(words.STATION_DELETE_BUTTON, this.deleteStation);
        }
    }

    addStationInTable(station) {
        this.addTableRow(station);
        addClickEventInDeleteButton(words.STATION_DELETE_BUTTON, this.deleteStation);
    }

    getAlertText(stationInputName) {
        let text = "";
        if(!isEmpty(stationInputName)) {
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
            if(addItem(words.STATIONS, stationInputName)) {
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
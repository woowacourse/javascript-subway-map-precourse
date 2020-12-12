import {
    addElement, 
    addInputElement,
    addTableElement, 
    addClickEventListener, 
    pageInit
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
       this.stationTable = document.getElementById(words.STATION_TABLE);
       this.resetTable();
       addClickEventListener(document.getElementById(words.STATION_ADD_BUTTON), () => {this.addStation()});
    }

    setTableContent() {
        const stationList = getItemList(words.STATIONS);
        let content = "";
        if(stationList !== null) {
            stationList.forEach(station => {
                content += `<tr><td>${station}</td>
                        <td><button class="${words.STATION_DELETE_BUTTON}">${words.DELETE}</button></td></tr>`;
            });
            //addClickEventListener(document.getElementsByClassName(words.STATION_DELETE_BUTTON), () => {this.deleteStation()});
        }
        this.stationTable.innerHTML += content;
    }

    resetTable() {
        let content = "";
        this.stationTable.innerHTML = "";
        words.STATION_LIST_HEADER.forEach(header => {
            content += `<th>${header}</th>`;
        })
        this.stationTable.innerHTML += content;
        this.setTableContent();
    }

    addStationInTable(station) {
        let content = `<tr><td>${station}</td>
                    <td><button class="${words.STATION_DELETE_BUTTON}">${words.DELETE}</button></td></tr>`;
        this.stationTable.innerHTML += content;
    }

    setPage() {
        pageInit();
        addElement("h4", words.STATION_NAME, null, null, null);
        addInputElement(words.STATION_NAME_INPUT, words.STATION_INPUT_ALERT);
        addElement("button", words.STATION_ADD, "id", words.STATION_ADD_BUTTON, null);
        addElement("h2", words.STATION_LIST, null, null, null);
        addTableElement(words.STATION_TABLE);
    }

    setAlert(stationInputName) {
        let isCorrect = true;
        if(!isEmpty(stationInputName)) {
            alert(words.STATION_INPUT_ALERT);
            isCorrect = false;
        }
        else if(stationInputName.length < 2) {
            alert(words.STATION_LENGTH_ALERT);
            isCorrect = false;
        }
        return isCorrect;
    }

    addStation() {
        const stationInputName = removeWhiteSpaceValue(document.getElementById(words.STATION_NAME_INPUT).value);
        if(this.setAlert(stationInputName)) {
            if(addItem(words.STATIONS, stationInputName)) {
                this.addStationInTable(stationInputName);
            }
        }
    }
}
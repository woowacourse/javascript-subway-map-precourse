import {setPage, addTableRow} from "./View/station-manager-view.js";
import {addClickEventListener, addClickEventInButtons} from "./common/elements.js";
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
        setPage();
        this.setTableContent();
        addClickEventListener(document.getElementById(words.STATION_ADD_BUTTON), () => {this.addStation()});
    }
    
    deleteStation(stationName, deleteRow) {
        const stationTableTbody = document.getElementById(words.STATION_TABLE_TBODY);
        stationTableTbody.removeChild(deleteRow);
        deleteItem(words.STATIONS, stationName);
        if(stationTableTbody.childElementCount === 0) {
            deleteKey(words.STATIONS);
        }
    }

    isStationInLine(stationName) {
        const lineList = getItemList(words.LINES);
        let result = false;
        for(let i = 0; i < lineList.length; i++) {
            result = isDuplicateItem(getItemList(lineList[i]), stationName);
            if(result) {
                break;
            }
        }
        return result;
    }

    decideDeleteStation(deleteButton) {
        const deleteRow = deleteButton.parentElement.parentElement;
        const stationName = deleteRow.dataset.stationName;
        if(this.isStationInLine(stationName)) {
            alert(`${stationName}${words.STATION_IN_LINE_ALERT}`);
        }
        else {
            this.deleteStation(stationName, deleteRow);
        }
    }

    confirmDeleteStation(deleteButton) {
        const isConfirm = confirm(words.DELETE_ALERT);
        if(isConfirm) {
            this.decideDeleteStation(deleteButton);
        }
    }

    setTableContent() {
        const stationList = getItemList(words.STATIONS);
        if(stationList.length > 0) {
            stationList.forEach(station => {
                addTableRow(station);
            });
            addClickEventInButtons(words.STATION_DELETE_BUTTON, this.confirmDeleteStation.bind(this), false);
        }
    }

    addStationInTable(station) {
        addTableRow(station);
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

    addStationInStorage(stationInputName) {
        if(addItem(words.STATIONS, stationInputName, -1)) {
            this.addStationInTable(stationInputName);
        }
        else {
            alert(`${stationInputName}${words.STATION_DUPLICATE_ALERT}`);
        }
    }

    addStation() {
        const stationInputName = removeWhiteSpaceValue(document.getElementById(words.STATION_NAME_INPUT).value);
        const alertText = this.getAlertText(stationInputName);
        alertText === "" ? this.addStationInStorage(stationInputName) : alert(alertText);
    }
}
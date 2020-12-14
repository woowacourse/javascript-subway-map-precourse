import { STATION } from "./constants.js";
import {addItem, deleteItem, getIndex, getList} from "./storageAccess.js";

STATION.ADD.addEventListener('click', () => {
    const stationName = STATION.INPUT.value;
    if (isStationValid(stationName)) {
        addStationStorage(stationName);
        addStationTable(stationName);
    }
})

export function setStationTable() {
    let stationList = getList(STATION.LISTNAME);
    for (let i=0; i<stationList.length; i++) {
        addStationTable(stationList[i]);
    }
}

function createStationDeleteButton(stationName) {
    let stationDeleteButton = document.createElement('button');
    stationDeleteButton.innerText = "삭제";

    stationDeleteButton.addEventListener('click', () => {
        deleteStationTable(stationName);
        deleteStationStorage(stationName);
    })

    return stationDeleteButton;
}

function deleteStationStorage(stationName) {
    deleteItem(stationName, STATION.LISTNAME);
    console.log(localStorage.getItem(STATION.LISTNAME));
}

function addStationStorage(stationName) {
    addItem(stationName, STATION.LISTNAME);
    console.log(getList(STATION.LISTNAME));
}

function deleteStationTable(stationName) {
    STATION.TABLE.deleteRow(getIndex(stationName,STATION.LISTNAME));
}

function addStationTable(stationName) {
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let button = document.createElement('td');

    // row.dataset.station = stationName;
    name.innerText = stationName;
    button.appendChild(createStationDeleteButton(stationName));

    row.appendChild(name);
    row.appendChild(button)

    STATION.TABLE.appendChild(row);
}

function isStationValid (stationName) {
    const stationList = getList(STATION.LISTNAME);
    return !stationList.includes(stationName);
}
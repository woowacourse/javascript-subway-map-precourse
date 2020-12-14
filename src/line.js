import { LINE, STATION } from "./constants.js";
import { addItem, deleteItem, getIndex, getList, createStationOption } from "./storageAccess.js";

LINE.ADD.addEventListener('click', () => {
    const lineName = LINE.INPUT.value;
    if (isLineValid(lineName)){
        addLineStorage(lineName, LINE.START.value, LINE.END.value);
        addLineTable(lineName, LINE.START.value, LINE.END.value);
    }
})

export function setLineTable() {
    let lineList = getList(LINE.LISTNAME);
    for (let i=0; i<lineList.length; i++) {
        // console.log(localStorage.getItem(lineList[i]));
        // console.log(JSON.parse('["인천","소요산"]'));
        let line = getList(lineList[i]);
        addLineTable(lineList[i], line[0], line[line.length-1]);
    }
}

export function setStartOption() {
    const stationList = getList(STATION.LISTNAME);
    for (let i=0; i<stationList.length; i++) {
        createStationOption(LINE.START, stationList[i]);
    }
}

export function setEndOption() {
    const stationList = getList(STATION.LISTNAME);
    for (let i=0; i<stationList.length; i++) {
        createStationOption(LINE.END, stationList[i]);
    }
}

function addLineStorage(lineName,startStation,endStation) {
    addItem(lineName, LINE.LISTNAME);
    localStorage.setItem(lineName,`["${startStation}","${endStation}"]`);
}

function addLineTable(lineName, startStation, endStation) {
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let start = document.createElement('td');
    let end = document.createElement('td');
    let button = document.createElement('td');
    
    name.innerText = lineName;
    start.innerText = startStation;
    end.innerText = endStation;
    // LINE.END.options[LINE.END.selectedIndex].text;
    button.appendChild(createLineDeleteButton(lineName));

    row.appendChild(name);
    row.appendChild(start);
    row.appendChild(end);
    row.appendChild(button);

    LINE.TABLE.appendChild(row);
}

function deleteLineStorage(lineName) {
    deleteItem(lineName, LINE.LISTNAME);
    localStorage.removeItem(lineName);
}

function deleteLineTable(lineName) {
    LINE.TABLE.deleteRow(getIndex(lineName, LINE.LISTNAME));
}

function createLineDeleteButton(lineName) {
    let lineDeleteButton = document.createElement('button');
    lineDeleteButton.innerText = LINE.DELETEMESSAGE;

    lineDeleteButton.addEventListener('click', () => {
        deleteLineTable(lineName);
        deleteLineStorage(lineName);
    })

    return lineDeleteButton;
}

function isLineValid(lineName) {
    const lineList = getList(LINE.LISTNAME);
    return !lineList.includes(lineName);
}
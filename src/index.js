
window.arrStations = new Array();
window.arrLine = new Array();
GetStationsArray();
GetLinesArray();

const eachStation = document.getElementById('#station-name-input').value;
const addStationBtn = document.getElementById('#station-add-button');
addStationBtn.addEventListener('click', addStationToTable);

const addStationToSectionButton = document.getElementById('#section-add-button');
addStationToSectionButton.addEventListener('click', addStationToSection);

const addLineBtn = document.getElementById('#line-add-button');
addLineBtn.addEventListener('click', addLineToTable);

let manageStations = document.getElementById('#station-manager-button');
let manageLines = document.getElementById('#line-manager-button');
let manageSections = document.getElementById('#section-manager-button');
let printSubwaymap = document.getElementById('#map-print-manager-button');

manageStations.addEventListener('click', showManageStations);
manageLines.addEventListener('click', showManageLines);
manageSections.addEventListener('click', showManageSections);
printSubwaymap.addEventListener('click', showSubwaymap);

function GetStationsArray() {
    if(localStorage.getItem("stations") != null) {
        arrStations = JSON.parse(localStorage.getItem("stations"));
        for(let i = 0; i < arrStations.length; i++) {
            createStationHTML(arrStations[i]);
        }
    }
}

function GetLinesArray() {
    if(localStorage.getItem("lines") != null) {
        arrLine  = JSON.parse(localStorage.getItem("lines"));
        for(let i=0; i < arrLine.length; i++) {
            makeTableOfLine(arrLine[i]);
            let length = arrLine [i].section.stations.length;
            if(length > 0) {
                createLineHTML(arrLine[i], arrLine[i].name, 
                                arrLine[i].section.stations[0], arrLine[i].section.stations[length - 1]);
                createStationInSectionHTML(arrLine[i]);
            }
        }
    }
}

function addStationToTable() {

    let stationName = document.getElementById('#station-name-input').value;

    let index = arrStations.indexOf(stationName); 
    if(index != -1) {
        alert('같은 역 이름을 입력할 수 없습니다.');
        return;
    }

    createStationHTML(stationName);  
    addStationToArray(stationName);
}

function createStationHTML(stationName) {
    let stationTable = document.getElementById('#print-station-list');
    let stationRow = stationTable.insertRow(stationTable.rows.length);
    let cell1 = stationRow.insertCell(0);
    cell1.innerHTML = stationName;

    let deleteButton = addStationDeleteBtnOnTable(stationRow);
    deleteStationFromTable(deleteButton);
    addOptionsToSelectBox(stationName);
    document.getElementById('#station-name-input').value='';
    addOptionsToSectionSelectBox(stationName);
}

function addStationDeleteBtnOnTable(stationRow) {
    let cell2 = stationRow.insertCell(1);
    let stationDeleteBtn = document.createElement('button');
    let stationDeleteBtnText = document.createTextNode('삭제');
    stationDeleteBtn.className = '.station-delete-button';
    stationDeleteBtn.appendChild(stationDeleteBtnText);
    document.body.appendChild(stationDeleteBtn);
    cell2.appendChild(stationDeleteBtn);

    return stationDeleteBtn;
}

function addOptionsToSelectBox(stationName) {
    //first station
    let selectStationStart = document.getElementById("#line-start-station-selector");
    let elStart = document.createElement("option");
    elStart.textContent = stationName;
    elStart.value = stationName;
    selectStationStart.appendChild(elStart);
    //last station
    let selectStationEnd = document.getElementById("#line-end-station-selector");
    let elEnd = document.createElement("option");
    elEnd.textContent = stationName;
    elEnd.value = stationName;
    selectStationEnd.appendChild(elEnd);
}

function deleteStationFromTable(deleteButton) {
    //connect delete function to the delete button
    deleteButton.addEventListener('click', function() {
        let arrButton = document.getElementsByClassName('.station-delete-button');
        let stationSelector = document.getElementById('#line-start-station-selector');
        let endStationSelector = document.getElementById('#line-end-station-selector');
        let index = [].slice.call(arrButton).indexOf(deleteButton);
        stationSelector.remove(index);
        endStationSelector.remove(index);

        deleteStationFromArray(index);

        this.parentElement.parentElement.remove();
    });
}

function addLineToTable() {
    let lineName = document.getElementById('#line-name-input').value;
    let firstStation = document.getElementById('#line-start-station-selector').value;
    let lastStation = document.getElementById('#line-end-station-selector').value;
    let newLine = new Line(lineName, firstStation, lastStation);
    
    addLineToArray(newLine);

    createLineHTML(newLine, newLine.name, firstStation, lastStation);
}

function createLineHTML(newLine, lineName, firstStation, lastStation) {
    let lineTable = document.getElementById('#print-line-list');
    let lineRow = lineTable.insertRow(lineTable.rows.length);
    let cell1 = lineRow.insertCell(0);
    let cell2 = lineRow.insertCell(1);
    let cell3 = lineRow.insertCell(2);
    cell1.innerHTML = lineName;
    cell2.innerHTML = firstStation;
    cell3.innerHTML = lastStation;
    document.getElementById('#line-name-input').value='';
    
    let deleteButton = addLineDeleteBtnOnTable(lineRow);
    makeLineBtnFromArray(newLine);
    deleteLineFromTable(deleteButton, newLine);
    makeTableOfLine(newLine);
}
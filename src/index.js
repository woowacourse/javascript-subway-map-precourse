
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

function addLineDeleteBtnOnTable(lineRow) {
    //add delete button on the table
    let lineDeleteBtn = document.createElement('button'); 
    let lineDeleteBtnText = document.createTextNode('삭제');
    let cell4 = lineRow.insertCell(3);
    lineDeleteBtn.className = '.line-delete-button';
    lineDeleteBtn.appendChild(lineDeleteBtnText);
    document.body.appendChild(lineDeleteBtn);
    cell4.appendChild(lineDeleteBtn);

    return lineDeleteBtn;
}

function deleteLineFromTable(deleteLineButton, newLine) {
    //connect delete function to the delete button
    deleteLineButton.addEventListener('click', function() {
        const index = arrLine.indexOf(newLine);
        //arrLine.splice(index,1);
        deleteLineFromArray(index);
        this.parentElement.parentElement.remove();
        makeSubwayMap();
    });
}

function makeLineBtnFromArray(newLine) {
    let lineBtn = document.createElement('button');
    let lineBtnText = document.createTextNode(newLine.name);
    lineBtn.appendChild(lineBtnText);
    lineBtn.className = '.section-line-menu-button';
    document.getElementById('line-buttons').appendChild(lineBtn);

    lineBtn.addEventListener('click', function() {showAddDeleteSection(newLine)});
}

function addOptionsToSectionSelectBox(stationName) {
    let selectSection = document.getElementById('#section-station-selector');
    let elSection = document.createElement('option');
    elSection.textContent = stationName;
    elSection.value = stationName;
    selectSection.appendChild(elSection);
}

function makeTableOfLine(newLine) {
    let container = document.getElementById('section-lists-container');
    let sectionTable = document.createElement('table');

    let headerRow = sectionTable.insertRow(0);
    let headerCell1 = headerRow.insertCell(0);
    let headerCell2 = headerRow.insertCell(1);
    let headerCell3= headerRow.insertCell(2);
    headerCell1.innerHTML = '순서';
    headerCell2.innerHTML = '이름';
    headerCell3.innerHTML = '설정';

    sectionTable.id = '#print-section-list-' + newLine.name;
    sectionTable.border = 1;
    sectionTable.classList.add('section-table');
    sectionTable.style.width = 'fit-content';

    let lengthOfStations = newLine.section.stations.length;
    for (let i = 0; i < lengthOfStations; i += 1) {
        addLineToSectionTable(sectionTable, newLine.section.stations[i], i);
    }
    makeSubwayMap();
    container.appendChild(sectionTable);
}

function addLineToSectionTable(sectionTable, sectionName, sectionOrder) {
    let sectionRow = sectionTable.insertRow(sectionOrder + 1);
    let sectionCell1 = sectionRow.insertCell(0);
    let sectionCell2 = sectionRow.insertCell(1);
    let sectionCell3= sectionRow.insertCell(2);
    sectionCell1.innerHTML = sectionOrder;
    sectionCell2.innerHTML = sectionName;
    addSectionDeleteBtn(sectionTable, sectionCell3);
}

function addSectionDeleteBtn(sectionTable, sectionCell3) {
    let sectionDeleteBtn = document.createElement('button');
    let sectionDeleteBtnText = document.createTextNode('노선에서 제거');
    sectionDeleteBtn.className = '.section-delete-button';
    sectionDeleteBtn.appendChild(sectionDeleteBtnText);
    document.body.appendChild(sectionDeleteBtn);
    sectionCell3.appendChild(sectionDeleteBtn);
    
    sectionDeleteBtn.addEventListener('click', function() {
        if(confirm('정말로 노선에서 제거하시겠습니까?')) {         
            let index = this.parentElement.parentElement.rowIndex - 1;
            let lineName = document.getElementById('selected-line-input').value; 
            let lineIndex = arrLine.findIndex(l => l.name == lineName); 
            let line = arrLine[lineIndex];

            removeStationFromSectionArray(line, index);

            for(let i = sectionTable.rows.length - 1; i > 0; i--){
                sectionTable.deleteRow(i);
            }

            for (let i = 0; i < line.section.stations.length; i++) {
                addLineToSectionTable(sectionTable, line.section.stations[i], i);
            }
            makeSubwayMap();
        } else {
           
        }
    });
}
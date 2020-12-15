
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

window.arrStations = new Array();
window.arrLine = new Array();



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
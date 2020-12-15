export function addStationToArray(newStation) {
    arrStations.push(newStation);
    localStorage.setItem("stations",JSON.stringify(arrStations));
}

export function deleteStationFromArray(index) {
    arrStations.splice(index,1);
    localStorage.setItem("stations",JSON.stringify(arrStations));
}

export function addLineToArray(newLine) {
    arrLine.push(newLine);
    localStorage.setItem("lines",JSON.stringify(arrLine));
}

export function deleteLineFromArray(index) {
    arrLine.splice(index,1);
    localStorage.setItem("lines",JSON.stringify(arrLine));
}

export function addStationToSectionArray(line, station, index) {
    line.section.stations.splice(index,0, station);
    localStorage.setItem("lines",JSON.stringify(arrLine));
}

export function removeStationFromSectionArray(line, index) {
    line.section.stations.splice(index,1);
    localStorage.setItem("lines",JSON.stringify(arrLine));
}

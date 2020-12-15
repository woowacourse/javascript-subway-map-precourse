import { confirmDeleteLine } from './controller.js'

const addPrintLineList = function(lineName, startStationInput, endStationInput) {
  const lineList = document.querySelector("#line-list");
  lineList.innerHTML += `<tr id="line-${lineName}"><td>${lineName}</td><td>${startStationInput}</td><td>${endStationInput}</td><td><button data-name="${lineName}" data-line-name="line-${lineName}" class="line-delete-button">삭제</button></td></tr>`;
  confirmDeleteLine();
}

const addOption = function(startStationSelector, endStationSelector) {
  const key = "station";
  const stations = JSON.parse(localStorage.getItem(key));
  let i;

  for (i = 0; i < stations.length; i++) {
    startStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
    endStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
  }
}

const printLineList = function() {
  const key = "line";
  const parsedLine = JSON.parse(localStorage.getItem(key));
  let lineList = document.querySelector("#line-list");
  let i;
  
  for (i = 0; i < parsedLine.length; i++) {
    const parsedLineLength = parsedLine[i].line.length
    lineList.innerHTML += `<tr id="line-${parsedLine[i].name}"><td>${parsedLine[i].name}</td><td>${parsedLine[i].line[0]}</td><td>${parsedLine[i].line[parsedLineLength - 1]}</td><td><button data-name="${parsedLine[i].name}" data-line-name="line-${parsedLine[i].name}" class="line-delete-button">삭제</button></td></tr>`;
  }
  confirmDeleteLine();
}

export { addPrintLineList, addOption, printLineList }
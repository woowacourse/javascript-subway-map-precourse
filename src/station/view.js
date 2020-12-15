import { confirmDelete } from './controller.js'

const addPrintStationList = function(stationName) {
  const stationNameInput = document.querySelector("#station-name-input");
  let stationList = document.querySelector("#station-list");
  stationNameInput.value = '';
  stationList.innerHTML += `<tr id="${stationName}"><td>${stationName}</td><td><button data-name="${stationName}" class="station-delete-button">삭제</button></td></tr>`;
  confirmDelete();
}

const printStationList = function() {
  const stationData = JSON.parse(localStorage.station)
  let stationList = document.querySelector("#station-list");
  let i;
  
  for (i = 0; i < stationData.length; i++) {
    const stationName = stationData[i].name;
    stationList.innerHTML += `<tr id="${stationName}"><td>${stationName}</td><td><button data-name="${stationName}" class="station-delete-button">삭제</button></td></tr>`;
  }
}

export { addPrintStationList, printStationList }
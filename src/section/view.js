import { getLineStations, confirmDeleteStation, addShowEvent } from './controller.js'

const printLineList = function(lineName) {
  const lineStations = getLineStations(lineName);
  const table = document.querySelector("#section-list")
  table.innerHTML = '';  
  table.innerHTML = `<tr><th scope="row">순서</th><th scope="row">이름</th><th scope="row">설정</th></tr>`;
  table.style.display = "table"
  let i;
  for (i = 0; i < lineStations.length; i++) {
    const index = lineStations.indexOf(lineStations[i])
    table.innerHTML += `<tr id="${lineStations[i]}"><td id="index">${index}</td><td>${lineStations[i]}</td><td><button data-name="${lineStations[i]}" data-line-name="${lineName}" class="section-delete-button">노선에서 제거</button></td></tr>`
  }
  confirmDeleteStation();
}

const showContents = function(lineName) {
  const section = document.querySelector("#section")
  const lineText = document.querySelector("#line-text")
  section.style.display = "block"
  lineText.innerText = `${lineName} 관리`
}

const addSelectButton = function() {
  const lines = JSON.parse(localStorage.getItem("line"))
  let i;
  for (i = 0; i < lines.length; i++) {
    const key = lines[i].name
    const select = document.querySelector("#select")
    select.innerHTML += `<button type="button" id="select-button" data-button-id="${key}" class="section-line-menu-button">${key}</button>`
    addShowEvent();
  }
}

const addOption = function() {
  const key = "station";
  const stations = JSON.parse(localStorage.getItem(key));
  const sectionStationSelector = document.querySelector("#section-station-selector")
  let i;

  for (i = 0; i < stations.length; i++) {
    sectionStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
  }
}

export { printLineList, showContents, addSelectButton, addOption }
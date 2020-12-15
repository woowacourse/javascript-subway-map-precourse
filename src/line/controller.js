import Line from "./model.js";
import { printLineList, addOption, addPrintLineList } from "./view.js";
import { isSpecialCharacter, isDuplicated, removeData } from "../check.js";

const addRegisterCount = function(stationName) {
  const key = "station";
  let stations = JSON.parse(localStorage.getItem(key));
  let i;
  for (i = 0; i < stations.length; i++) {
    if (stations[i].name === stationName) {
      stations[i].registered += 1;
      localStorage.setItem(key, JSON.stringify(stations));
    }
  }
}

const deleteRegisterCount = function(stationName) {
  const key = "station";
  let stations = JSON.parse(localStorage.getItem(key));
  let i;
  for (i = 0; i < stations.length; i++) {
    if (stations[i].name === stationName) {
      stations[i].registered -= 1;
      localStorage.setItem(key, JSON.stringify(stations));
    }
  }
}

const registerStation = function(check, registerList) {
  const loop = 2;
  let i;
  for (i = 0; i < loop; i++) {
    if (check == "add") {
       addRegisterCount(registerList[i]);
    } else {
      deleteRegisterCount(registerList[i]);
    }
  }
}

const getLineStations = function(lineName) {
  let objects = JSON.parse(localStorage.getItem("line"));
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === lineName) {
      return objects[i].line;
    }
  }
}

const deleteLine = function(lineName, dataName) {
  const deleteTarget = document.querySelector(`#${dataName}`);
  const stationList = getLineStations(lineName);
  deleteTarget.remove();
  removeData("line", lineName);
  registerStation("delete", stationList);
}

const confirmDeleteLine = function() {
  const lineDeleteButton = document.getElementsByClassName("line-delete-button");
  let i;
  for (i = 0; i < lineDeleteButton.length; i++) {
    const lineName = lineDeleteButton[i].dataset.name;
    const dataName = lineDeleteButton[i].dataset.lineName;
    lineDeleteButton[i].addEventListener("click", () => {
      const returnValue = confirm("정말로 삭제하시겠습니까?");
      if (returnValue) {
        deleteLine(lineName, dataName);
      }
    })
  }
}

const addPrintStationList = function(stationName) {
  const stationNameInput = document.querySelector("#station-name-input");
  let stationList = document.querySelector("#station-list");
  stationNameInput.value = '';
  stationList.innerHTML += `<tr id="${stationName}"><td>${stationName}</td><td><button data-name="${stationName}" class="station-delete-button">삭제</button></td></tr>`;
  confirmDelete();
}

const addLine = function(lineName, startStationInput, endStationInput) {
  const lineAddButton = document.querySelector("#line-add-button");
  lineAddButton.addEventListener("click", () => {
    let value = JSON.parse(localStorage.getItem("line"));
    if (localStorage.getItem("line")) {
      value.push(new Line(lineName, startStationInput, endStationInput));
      localStorage.setItem("line", JSON.stringify(value));
    } else {
      localStorage.setItem("line", JSON.stringify([new Line(lineName, startStationInput, endStationInput)]));
    }
    registerStation("add", [startStationInput, endStationInput]);
    confirmDeleteLine();
    addPrintLineList(lineName, startStationInput, endStationInput);
  }, {once: true});
}

const getEndStationInput = function(lineName, startStationValue) {
  const endStationSelector = document.querySelector("#line-end-station-selector");
  endStationSelector.addEventListener("mouseleave", () => {
    const endStationValue = endStationSelector.value;
    const alertText = "상행 종점과 하행 종점을 서로 다른 역으로 선택해 주세요.";
    if (startStationValue !== endStationValue) {
      addLine(lineName, startStationValue, endStationValue);
    } else {
      alert(alertText);
    }
  }, {once: true});
}

const getStartStationInput = function(lineName) {
  const startStationSelector = document.querySelector("#line-start-station-selector");
  startStationSelector.addEventListener("mouseleave", () => {
    const startStationValue = startStationSelector.value;   
    getEndStationInput(lineName, startStationValue);
  }, {once: true});
}

const getLineName = function() {
  const lineNameInput = document.querySelector("#line-name-input");
  lineNameInput.addEventListener("change", () => {
    const lineName = document.querySelector("#line-name-input").value;
    const alertText = "노선 목록에 없는 단어를 입력해 주세요.";
    if (!isSpecialCharacter(lineName) && !isDuplicated(lineName)) {
      getStartStationInput(lineName);
    } else {
      alert(alertText);
    }
  })
}

const init = function() {
  const startStationSelector = document.querySelector("#line-start-station-selector");
  const endStationSelector = document.querySelector("#line-end-station-selector");
  if (localStorage.getItem("line")) {
    printLineList();
  }
  if (localStorage.getItem("station")) {
    addOption(startStationSelector, endStationSelector);
  }
  getLineName();
}

init();

export { confirmDeleteLine };
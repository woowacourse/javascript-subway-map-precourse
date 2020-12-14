import Line from "./line.js";
import { isSpecialCharacter, isDuplicated, removeData } from "./check.js";

export default function LineManager() {
  this.addRegisterCount = function(stationName) {
    const key = "station";
    let stations = JSON.parse(localStorage.getItem(key));
    let i;
    for (i = 0; i < stations.length; i++) {
      if (stations[i].name === stationName) {
        stations[i].registered += 1
        localStorage.setItem(key, JSON.stringify(stations))
      }
    }
  }

  this.deleteRegisterCount = function(stationName) {
    const key = "station";
    let stations = JSON.parse(localStorage.getItem(key));
    let i;
    for (i = 0; i < stations.length; i++) {
      if (stations[i].name === stationName) {
        stations[i].registered -= 1
        localStorage.setItem(key, JSON.stringify(stations))
      }
    }
  }

  this.registerStation = function(check, registerList) {
    const loop = 2
    let i;
    for (i = 0; i < loop; i++) {
      if (check == "add") {
        this.addRegisterCount(registerList[i]);
      } else {
        this.deleteRegisterCount(registerList[i])
      }
    }
  }

  this.getLineStations = function(lineName) {
    let objects = JSON.parse(localStorage.getItem("line"));
    let i;
    for (i = 0; i < objects.length; i++) {
      if (objects[i].name === lineName) {
        return objects[i].line
      }
    }
  }

  this.deleteLine = function(lineName, dataName) {
    const deleteTarget = document.querySelector(`#${dataName}`);
    const stationList = this.getLineStations(lineName);
    deleteTarget.remove();
    removeData("line", lineName);
    this.registerStation("delete", stationList)
  }

  this.confirmDeleteLine = function() {
    const lineDeleteButton = document.getElementsByClassName("line-delete-button");
    let i;
    for (i = 0; i < lineDeleteButton.length; i++) {
      const lineName = lineDeleteButton[i].dataset.name;
      const dataName = lineDeleteButton[i].dataset.lineName;
      lineDeleteButton[i].addEventListener("click", () => {
        const returnValue = confirm("정말로 삭제하시겠습니까?");
        if (returnValue) {
          this.deleteLine(lineName, dataName);
        }
      })
    }
  }

  this.addPrintLineList = function(lineName, startStationInput, endStationInput) {
    const lineList = document.querySelector("#line-list");
    lineList.innerHTML += `<tr id="line-${lineName}"><td>${lineName}</td><td>${startStationInput}</td><td>${endStationInput}</td><td><button data-name="${lineName}" data-line-name="line-${lineName}" class="line-delete-button">삭제</button></td></tr>`;
    this.confirmDeleteLine();
  }

  this.addLine = function(lineName, startStationInput, endStationInput) {
    const lineAddButton = document.querySelector("#line-add-button");
    lineAddButton.addEventListener("click", () => {
      let value = JSON.parse(localStorage.getItem("line"));
      if (localStorage.getItem("line")) {
        value.push(new Line(lineName, startStationInput, endStationInput))
        localStorage.setItem("line", JSON.stringify(value));
      } else {
        localStorage.setItem("line", JSON.stringify([new Line(lineName, startStationInput, endStationInput)]));
      }
      this.registerStation("add", [startStationInput, endStationInput]);
      this.confirmDeleteLine();
      this.addPrintLineList(lineName, startStationInput, endStationInput);
    }, {once: true});
  }

  this.getEndStationInput = function(lineName, startStationValue) {
    const endStationSelector = document.querySelector("#line-end-station-selector");
    endStationSelector.addEventListener("mouseleave", () => {
      const endStationValue = endStationSelector.value;
      const alertText = "상행 종점과 하행 종점을 서로 다른 역으로 선택해 주세요.";
      if (startStationValue !== endStationValue) {
        this.addLine(lineName, startStationValue, endStationValue);
      } else {
        alert(alertText);
      }
    }, {once: true});
  }

  this.getStartStationInput = function(lineName) {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    startStationSelector.addEventListener("mouseleave", () => {
      const startStationValue = startStationSelector.value;   
      this.getEndStationInput(lineName, startStationValue);
    }, {once: true});
  }

  this.getLineName = function() {
    const lineNameInput = document.querySelector("#line-name-input");
    lineNameInput.addEventListener("change", () => {
      const lineName = document.querySelector("#line-name-input").value;
      const alertText = "노선 목록에 없는 단어를 입력해 주세요.";
      if (!isSpecialCharacter(lineName) && !isDuplicated(lineName)) {
        this.getStartStationInput(lineName);
      } else {
        alert(alertText);
      }
    })
  }

  this.addOption = function(startStationSelector, endStationSelector) {
    const key = "station";
    const stations = JSON.parse(localStorage.getItem(key));
    let i;

    for (i = 0; i < stations.length; i++) {
      startStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
      endStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
    }
  }

  this.printLineList = function() {
    const key = "line";
    const parsedLine = JSON.parse(localStorage.getItem(key));
    let lineList = document.querySelector("#line-list");
    let i;
    
    for (i = 0; i < parsedLine.length; i++) {
      const parsedLineLength = parsedLine[i].line.length
      lineList.innerHTML += `<tr id="line-${parsedLine[i].name}"><td>${parsedLine[i].name}</td><td>${parsedLine[i].line[0]}</td><td>${parsedLine[i].line[parsedLineLength - 1]}</td><td><button data-name="${parsedLine[i].name}" data-line-name="line-${parsedLine[i].name}" class="line-delete-button">삭제</button></td></tr>`;
    }
    this.confirmDeleteLine();
  }

  this.init = function() {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    const endStationSelector = document.querySelector("#line-end-station-selector");
    if (localStorage.getItem("line")) {
      this.printLineList();
    }
    if (localStorage.getItem("station")) {
      this.addOption(startStationSelector, endStationSelector);
    }
    this.getLineName();
  }

  this.init();
}

new LineManager();
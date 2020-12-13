import { isSpecialCharacter, isDuplicatedName } from "./check.js";

export default function Line() {
  this.deleteLine = function(lineName, dataName) {
    const deleteTarget = document.querySelector(`#${dataName}`);
    deleteTarget.remove();
    localStorage.removeItem(lineName);
  }

  this.confirmDeleteLine = function(lineName) {
    const lineDeleteButton = document.getElementsByClassName("line-delete-button");
    let i;
    for (i = 0; i < lineDeleteButton.length; i++) {
      const dataName = lineDeleteButton[i].dataset.name;
      lineDeleteButton[i].addEventListener("click", () => {
        const returnValue = confirm("정말로 삭제하시겠습니까?");
        if (returnValue) {
          this.deleteLine(lineName, dataName);
        }
      })
    }
  }

  this.addLine = function(lineName, startStationInput, endStationInput) {
    const lineAddButton = document.querySelector("#line-add-button");
    lineAddButton.addEventListener("click", () => {
      const lineList = document.querySelector("#line-list");
      lineList.innerHTML += `<tr id="line-${lineName}"><td>${lineName}</td><td>${startStationInput}</td><td>${endStationInput}</td><td><button data-name="line-${lineName}" class="line-delete-button">삭제</button></td></tr>`;
      localStorage.setItem(lineName, JSON.stringify([startStationInput, endStationInput]));
      this.confirmDeleteLine(lineName);
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
      if (!isSpecialCharacter(lineName) && !isDuplicatedName(lineName)) {
        this.getStartStationInput(lineName);
      } else {
        alert(alertText);
      }
    })
  }

  this.addOption = function(startStationSelector, endStationSelector) {
    let i;

    for (i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const parsedStationObject = JSON.parse(localStorage.getItem(key));

      if (parsedStationObject[0] === "station") {
        startStationSelector.innerHTML += `<option>${key}</option>`;
        endStationSelector.innerHTML += `<option>${key}</option>`;
      }
    }
  }

  this.printLineList = function() {
    let lineList = document.querySelector("#line-list");
    let i;
    
    for (i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const parsedObject = JSON.parse(localStorage.getItem(key));

      if (parsedObject[0] !== "station") {
        lineList.innerHTML += `<tr id="line-${key}"><td>${key}</td><td>${parsedObject[0]}</td><td>${parsedObject[1]}</td><td><button data-name="line-${key}" class="line-delete-button">삭제</button></td></tr>`;
      }
    }
    this.confirmDeleteLine();
  }

  this.init = function() {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    const endStationSelector = document.querySelector("#line-end-station-selector");

    this.addOption(startStationSelector, endStationSelector);
    this.getLineName();
    this.printLineList();
  }

  this.init();
}

new Line();
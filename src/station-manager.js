import Station from './station.js'
import { isSpecialCharacter, isDuplicated, isValidLength, isRegisteredStation } from './check.js';

export default function StationManager() {
  this.deleteStation = function(dataName) {
    if (!isRegisteredStation(dataName)) {
      const deleteTarget = document.querySelector(`#${dataName}`);
      deleteTarget.remove();
      localStorage.removeItem(dataName);
    } else {
      const alertText = "노선에 등록된 역은 삭제할 수 없습니다.";
      alert(alertText);
    }
  }

  this.confirmDelete = function() {
    const stationDeleteButton = document.getElementsByClassName("station-delete-button");
    let i;
    for (i = 0; i < stationDeleteButton.length; i++) {
      const dataName = stationDeleteButton[i].dataset.name;
      stationDeleteButton[i].addEventListener("click", () => {
        const returnValue = confirm("정말로 삭제하시겠습니까?");
        if (returnValue) {
          this.deleteStation(dataName);
        }
      })
    }
  }

  this.addPrintStationList = function(stationName) {
    const stationNameInput = document.querySelector("#station-name-input");
    let stationList = document.querySelector("#station-list");
    stationNameInput.value = '';
    stationList.innerHTML += `<tr id="${stationName}"><td>${stationName}</td><td><button data-name="${stationName}" class="station-delete-button">삭제</button></td></tr>`;
    this.confirmDelete();
  }

  this.addStation = function(stationName) {
    const key = "station";
    let value = JSON.parse(localStorage.getItem(key));
    if (localStorage.getItem(key)) {
      value.push(new Station(stationName))
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify([new Station(stationName)]));
    }
    this.addPrintStationList(stationName);
  }

  this.getStationName = function() {
    const stationAddButton = document.querySelector("#station-add-button");
    stationAddButton.addEventListener("click", () => {
      const stationName = document.querySelector("#station-name-input").value;
      const alertText = "지하철 역 목록에 없는 2글자 이상의 단어를 입력해 주세요.";
      if (!isSpecialCharacter(stationName) && !isDuplicated(stationName) && isValidLength(stationName)) {
        this.addStation(stationName);
      } else {
        alert(alertText);
      }
    })
  }

  this.printStationList = function() {
    const stationData = JSON.parse(localStorage.station)
    console.log(stationData)
    let stationList = document.querySelector("#station-list");
    let i;
    
    for (i = 0; i < stationData.length; i++) {
      const stationName = stationData[i].name;
      stationList.innerHTML += `<tr id="${stationName}"><td>${stationName}</td><td><button data-name="${stationName}" class="station-delete-button">삭제</button></td></tr>`;
    }
  }

  this.init = function() {
    this.getStationName();
    if (localStorage) {
      this.printStationList();
      this.confirmDelete();
    }
  }

  this.init();
}
  
new StationManager();
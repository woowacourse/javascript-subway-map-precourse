import Station from './model.js'
import { printStationList, addPrintStationList } from './view.js'
import { isSpecialCharacter, isDuplicated, isValidLength, isRegisteredStation, removeData } from '../check.js';

const deleteStation = function(dataName) {
  if (!isRegisteredStation(dataName)) {
    const deleteTarget = document.querySelector(`#${dataName}`);
    deleteTarget.remove();
    removeData("station", dataName);
  } else {
    const alertText = "노선에 등록된 역은 삭제할 수 없습니다.";
    alert(alertText);
  }
}

const confirmDelete = function() {
  const stationDeleteButton = document.getElementsByClassName("station-delete-button");
  let i;
  for (i = 0; i < stationDeleteButton.length; i++) {
    const dataName = stationDeleteButton[i].dataset.name;
    stationDeleteButton[i].addEventListener("click", () => {
      const returnValue = confirm("정말로 삭제하시겠습니까?");
      if (returnValue) {
        deleteStation(dataName);
      }
    })
  }
}

const addStation = function(stationName) {
  const key = "station";
  let value = JSON.parse(localStorage.getItem(key));
  if (localStorage.getItem(key)) {
    value.push(new Station(stationName))
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify([new Station(stationName)]));
  }
  addPrintStationList(stationName);
}

const getStationName = function() {
  const stationAddButton = document.querySelector("#station-add-button");
  stationAddButton.addEventListener("click", () => {
    const stationName = document.querySelector("#station-name-input").value;
    const alertText = "지하철 역 목록에 없는 2글자 이상의 단어를 입력해 주세요.";
    if (!isSpecialCharacter(stationName) && !isDuplicated(stationName) && isValidLength(stationName)) {
      addStation(stationName);
    } else {
      alert(alertText);
    }
  })
}

const init = function() {
  getStationName();
  if (localStorage.getItem("station")) {
    printStationList();
    confirmDelete();
  }
}

init();

export {confirmDelete}
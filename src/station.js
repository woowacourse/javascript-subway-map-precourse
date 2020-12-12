import { isSpecialCharacter, isValidLength } from './check.js'

export default function Station() {
  this.confirmDelete = function() {
    const stationDeleteButton = document.getElementsByClassName("station-delete-button");
    let i;
    for (i = 0; i < stationDeleteButton.length; i++) {
      const dataName = stationDeleteButton[i].dataset.name
      stationDeleteButton[i].addEventListener("click", () => {
        const returnValue = confirm("정말로 삭제하시겠습니까?")
        if (returnValue) {
          console.log(dataName)
        }
      })
    }
  }

  this.addStation = function(stationName) {
    const key = stationName;
    const value = false;
    let stationList = document.querySelector("#station-list")
    localStorage.setItem(key, value);
    stationList.innerHTML += `<tr id="${key}"><td>${key}</td><td><button data-name="${key}" class="station-delete-button">삭제</button></td></tr>`;
    this.confirmDelete();
  }

  this.getStationName = function() {
    const stationAddButton = document.querySelector("#station-add-button");
    stationAddButton.addEventListener("click", () => {
      const stationName = document.querySelector("#station-name-input").value;
      const alertText = "2글자 이상의 단어를 입력해 주세요."
      if (!isSpecialCharacter(stationName) && isValidLength(stationName)) {
        this.addStation(stationName);
      } else {
        alert(alertText)
      }
    })
  }

  this.printStationList = function() {
    let stationList = document.querySelector("#station-list");
    let i;
    for (i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stationList.innerHTML += `<tr id="${key}"><td>${key}</td><td><button data-name="${key}" class="station-delete-button">삭제</button></td></tr>`;
    }
  }

  this.init = function() {
    if (localStorage) {
      this.confirmDelete();
    }
  }

  this.getStationName();
  this.printStationList();
  this.init();
}
  
new Station();
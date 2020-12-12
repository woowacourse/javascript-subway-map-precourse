import { isSpecialCharacter, isValidLength } from './check.js'

export default function Station() {
  this.addStation = function(stationName) {
    const key = stationName;
    const value = false;
    let stationList = document.querySelector("#station-list")
    localStorage.setItem(key, value);
    stationList.innerHTML += `<tr id="${key}"><td>${key}</td><td><button data-name="${key}" class="station-delete-button">삭제</button></td></tr>`;
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

  this.getStationName();
}
  
new Station();
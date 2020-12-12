import { isSpecialCharacter, isValidLength } from './check.js'

export default function Station() {
  this.getStationName = function() {
    const stationAddButton = document.querySelector("#station-add-button");
    stationAddButton.addEventListener("click", () => {
      const stationName = document.querySelector("#station-name-input").value;
      const alertText = "2글자 이상의 단어를 입력해 주세요."
      if (!isSpecialCharacter(stationName) && isValidLength(stationName)) {
        console.log(stationName);
      } else {
        alert(alertText)
      }
    })
  }

  this.getStationName();
}
  
new Station();
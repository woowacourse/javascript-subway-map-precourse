import { isSpecialCharacter, isDuplicated } from './check.js'

export default function Line() {
  this.getLineName = function() {
    const lineNameInput = document.querySelector("#line-name-input");
    lineNameInput.addEventListener("change", () => {
      const lineName = document.querySelector("#line-name-input").value;
      const alertText = "노선 목록에 없는 단어를 입력해 주세요."
      if (!isSpecialCharacter(lineName) && !isDuplicated(lineName)) {
        console.log(lineName);
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

  this.init = function() {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    const endStationSelector = document.querySelector("#line-end-station-selector");
    this.addOption(startStationSelector, endStationSelector);
    this.getLineName();
  }

  this.init();
}

new Line();
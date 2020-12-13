import { isSpecialCharacter, isDuplicated } from './check.js'

export default function Line() {
  this.getEndStationInput = function(lineName, startStationValue) {
    const endStationSelector = document.querySelector("#line-end-station-selector");
    endStationSelector.addEventListener("mouseleave", () => {
      const endStationValue = endStationSelector.value;
      const alertText = "상행 종점과 하행 종점을 서로 다른 역으로 선택해 주세요.";
      if (startStationValue !== endStationValue) {
        console.log(lineName, startStationValue, endStationValue);
      } else {
        alert(alertText);
      }
    });
  }

  this.getStartStationInput = function(lineName) {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    startStationSelector.addEventListener("mouseleave", () => {
      const startStationValue = startStationSelector.value;   
      this.getEndStationInput(lineName, startStationValue);
    });
  }

  this.getLineName = function() {
    const lineNameInput = document.querySelector("#line-name-input");
    lineNameInput.addEventListener("change", () => {
      const lineName = document.querySelector("#line-name-input").value;
      const alertText = "노선 목록에 없는 단어를 입력해 주세요."
      if (!isSpecialCharacter(lineName) && !isDuplicated(lineName)) {
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

  this.init = function() {
    const startStationSelector = document.querySelector("#line-start-station-selector");
    const endStationSelector = document.querySelector("#line-end-station-selector");
    this.addOption(startStationSelector, endStationSelector);
    this.getLineName();
  }

  this.init();
}

new Line();
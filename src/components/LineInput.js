import { isTextOverMinLength } from "../util/validation.js";
import { ELEMENT_INFO, LINE_NAME_MIN_LENGTH, ERROR_MESSAGE } from "../util/constants.js";

export default function LineInput({ $target, stations, isExistLineName, onAddLine }) {
  const { lineNameInput, lineStartStationSelector, lineEndStationSelector, lineAddButton } = ELEMENT_INFO;

  this.$container = document.createElement("form");
  $target.append(this.$container);

  this.stations = stations;
  this.onAddLine = onAddLine;

  this.$container.addEventListener("submit", (e) => {
    const $lineNameInput = document.querySelector(`#${lineNameInput.id}`);
    const startStationName = document.querySelector(`#${lineStartStationSelector.id}`).value;
    const endStationName = document.querySelector(`#${lineEndStationSelector.id}`).value;

    if (this.isValidInput({ $lineNameInput, startStationName, endStationName })) {
      this.onAddLine({
        name: $lineNameInput.value,
        stations: [startStationName, endStationName],
      });

      e.target.reset();
    }

    e.preventDefault();
  });

  this.isValidInput = ({ $lineNameInput, startStationName, endStationName }) => {
    return (
      this.isLineNameOverMinLength($lineNameInput) &&
      !this.isExistLineName($lineNameInput) &&
      !this.isSameStation(startStationName, endStationName)
    );
  };

  this.isLineNameOverMinLength = ($lineNameInput) => {
    const result = isTextOverMinLength($lineNameInput.value, LINE_NAME_MIN_LENGTH);

    if (!result) {
      alert(ERROR_MESSAGE.shortLineName);
      $lineNameInput.value = "";
    }

    return result;
  };

  this.isExistLineName = ($lineNameInput) => {
    const result = isExistLineName($lineNameInput.value);

    if (result) {
      alert(ERROR_MESSAGE.duplicatedLineName);
      $lineNameInput.value = "";
    }

    return result;
  };

  this.isSameStation = (startStationName, endStationName) => {
    if (startStationName === endStationName) {
      alert(ERROR_MESSAGE.sameStartAndEndStation);

      return true;
    }

    return false;
  };

  this.setState = ({ nextStations }) => {
    this.stations = nextStations;

    this.render();
  };

  this.createSelectOptionHTMLString = () => {
    return this.stations.map((station) => `<option value="${station}">${station}</option>`).join("");
  };

  this.render = () => {
    this.$container.innerHTML = `
      <label for="${lineNameInput.id}">${lineNameInput.text}</label>
      <input id="${lineNameInput.id}" type="text" palceholder="노선 이름을 입력해주세요" />
      <label>
        ${lineStartStationSelector.text}
        <select id="${lineStartStationSelector.id}">${this.createSelectOptionHTMLString()}</select>
      </label>
      <label>
        ${lineEndStationSelector.text}
        <select id="${lineEndStationSelector.id}">${this.createSelectOptionHTMLString()}</select>
      </label>
      <button id="${lineAddButton.id}" type="submit">${lineAddButton.text}</button>
    `;
  };

  this.render();
}

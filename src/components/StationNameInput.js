import { isTextOverMinLength } from "../util/validation.js";
import { ELEMENT_INFO, STATION_NAME_MIN_LENGTH, ERROR_MESSAGE } from "../util/constants.js";

export default function StationNameInput({ $target, isExistStationName, onAddStation }) {
  this.$container = document.createElement("form");
  $target.append(this.$container);

  this.isExistStationName = isExistStationName;
  this.onAddStation = onAddStation;

  const { stationNameInput, stationNameSubmit } = ELEMENT_INFO;

  this.bindOnSubmit = () => {
    this.$container.addEventListener("submit", (e) => {
      const $stationNameInput = document.querySelector(`#${stationNameInput.id}`);

      if (this.isValidStationName($stationNameInput.value)) {
        this.onAddStation($stationNameInput.value);
      }

      $stationNameInput.value = "";

      e.preventDefault();
    });
  };

  this.isValidStationName = (stationName) => {
    if (!isTextOverMinLength(stationName, STATION_NAME_MIN_LENGTH)) {
      alert(ERROR_MESSAGE.shortStationName);

      return false;
    }

    if (this.isExistStationName(stationName)) {
      alert(ERROR_MESSAGE.duplicatedStationName);

      return false;
    }

    return true;
  };

  this.render = () => {
    this.$container.innerHTML = `
      <label>
        ${stationNameInput.text}<br />
        <input id="${stationNameInput.id}" type="text" name="역 이름" placeholder="역 이름을 입력해주세요." />
      </label>
      <button id="${stationNameSubmit.id}" type="submit">${stationNameSubmit.text}</button>
    `;
  };

  this.render();
  this.bindOnSubmit();
}

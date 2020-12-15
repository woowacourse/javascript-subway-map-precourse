import { isTextOverMinLength } from "../util/validation.js";
import { ELEMENT_INFO, LINE_NAME_MIN_LENGTH, ERROR_MESSAGE } from "../util/constants.js";

export default function LineInput({ $target, stations, isExistLineName }) {
  this.$container = document.createElement("form");
  $target.append(this.$container);

  this.stations = stations;

  const { lineNameInput, lineStartStationSelector, lineEndStationSelector, lineAddButton } = ELEMENT_INFO;

  this.bindOnSubmit = () => {
    this.$container.addEventListener("submit", (e) => {
      const $lineNameInput = document.querySelector(`#${lineNameInput.id}`);

      console.log(this.isValidLineName($lineNameInput));

      e.preventDefault();
    });
  };

  this.isValidLineName = ($lineNameInput) => {
    let result = true;

    result = this.isLineNameOverMinLength($lineNameInput.value);
    result = this.isExistLineName($lineNameInput.value);

    if (!result) {
      $lineNameInput.value = "";
    }

    return result;
  };

  this.isLineNameOverMinLength = (lineName) => {
    const result = isTextOverMinLength(lineName, LINE_NAME_MIN_LENGTH);

    if (!result) {
      alert(ERROR_MESSAGE.shortLineName);
    }

    return result;
  };

  this.isExistLineName = (lineName) => {
    const result = isExistLineName(lineName);

    if (!result) {
      alert(ERROR_MESSAGE.duplicatedLineName);
    }

    return result;
  };

  this.createSelectOptionHTMLString = () => {
    return this.stations
      .map((station, index) => `<option data-index="${index}" value="${station}">${station}</option>`)
      .join("");
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
  this.bindOnSubmit();
}

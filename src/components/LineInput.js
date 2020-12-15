import { ELEMENT_INFO } from "../util/constants.js";

export default function LineInput({ $target, stations }) {
  this.$container = document.createElement("form");
  $target.append(this.$container);

  this.stations = stations;

  const { lineNameInput, lineStartStationSelector, lineEndStationSelector, lineAddButton } = ELEMENT_INFO;

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
}

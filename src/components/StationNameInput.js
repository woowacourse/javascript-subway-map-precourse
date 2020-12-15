import { ELEMENT_INFO } from "../util/constants.js";

export default function StationNameInput({ $target }) {
  this.$container = document.createElement("form");
  $target.append(this.$container);

  const { stationNameInput, stationNameSubmit } = ELEMENT_INFO;

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
}

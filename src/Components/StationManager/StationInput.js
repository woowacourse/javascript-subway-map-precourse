import { clearInput } from "../../utils/domUtil.js";
import { isVaildStationName } from "../../utils/validations/stationValidation.js";

import { ID } from "../../utils/constants/dom.js";

class StationInput {
  constructor($target, { stationStore }) {
    this.$target = $target;
    this.stationStore = stationStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>역 이름</p>
      <Input id=${ID.STATION_NAME_INPUT} placeholder="역 이름을 입력해주세요." />
      <button id="${ID.STATION_ADD_BUTTON}">역 추가</button>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#${ID.STATION_NAME_INPUT}`);
    this.$button = this.$target.querySelector(`#${ID.STATION_ADD_BUTTON}`);
  }

  bindEvents() {
    this.$button.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.id !== ID.STATION_ADD_BUTTON) return;
    const name = this.$input.value.trim();

    if (!isVaildStationName(this.$input, this.stationStore.stations, name)) {
      return;
    }

    clearInput(this.$input);
    this.stationStore.addStation(name);
  }

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default StationInput;

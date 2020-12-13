import { stationSelector } from "../../_store/selectors.js";

export default class Select {
  constructor(id) {
    this.element = document.createElement("select");
    this.element.id = id;
  }

  appendOptions() {
    const stationList = stationSelector();
    stationList
      .map((stationName) => {
        const $option = document.createElement("option");
        $option.value = stationName;
        $option.innerText = stationName;
        return $option;
      })
      .forEach(($option) => this.element.appendChild($option));
  }
}

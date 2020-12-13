import { stationSelector } from "../../_store/selectors.js";

export default class Select {
  constructor(id) {
    this.element = document.createElement("select");
    this.element.id = id;
  }
}

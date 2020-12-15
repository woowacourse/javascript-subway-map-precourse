import { errorMessage, confirmMessage } from "../utils/const.js";

export default {
  isAddedEvent: false,
  station: [],
  init(page) {
    this.page = page;
    this.station = [];
    this.render();
    if (!this.isAddedEvent) {
      this.addEvents();
    }
    this.isAddedEvent = true;
  },
  addEvents() {
    const $btnAdd = document.querySelector("#station-add-button");
    const $tbody = document.querySelector("tbody");
    $btnAdd.addEventListener("click", () => this.clickAdd());
    $tbody.addEventListener("click", (e) => this.clickDelete(e));
  },
  clickAdd() {
    const { ERROR_NONEXISTENT_STATION, ERROR_SHORT_STATION, ERROR_ALREADY_HAVE_STATION } = errorMessage;
    const $input = document.querySelector("#station-name-input");
    const { value: name } = $input;
    if (!name) {
      alert(ERROR_NONEXISTENT_STATION);
      return;
    }
    if (name.trim().length < 2) {
      alert(ERROR_SHORT_STATION);
      $input.value = "";
      return;
    }
    if (this.station.indexOf(name) > -1) {
      alert(ERROR_ALREADY_HAVE_STATION);
      return;
    }
    this.station.push(name);
    this.render();
    $input.value = "";
  },
  clickDelete(e) {
    const { CONFIRM_DELETE_STATION } = confirmMessage;
    const { id, dataset } = e.target;
    if (id !== "delete-btn") {
      return;
    }
    if (!confirm(CONFIRM_DELETE_STATION)) {
      return;
    }
    const stationIndex = this.station.indexOf(dataset.name);
    this.station.splice(stationIndex, 1);
    this.render();
  },
  render() {
    const innerHTML = this.station.reduce((prevHTML, station) => {
      return (
        prevHTML +
        `<tr>
        <td>${station}</td>
        <td>
          <button data-station="${station}" id="delete-btn">삭제</button>
        </td>
      </tr>`
      );
    }, "");
    const $tbody = document.querySelector("tbody");
    $tbody.innerHTML = innerHTML;
  },
};

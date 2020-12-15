import { errorMessage, confirmMessage } from "../utils/const.js";
import Station from "../Models/Station.js";

export default {
  isAddedEvent: false,
  init(page) {
    this.page = page;
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
    if (Station.list().indexOf(name) > -1) {
      alert(ERROR_ALREADY_HAVE_STATION);
      return;
    }
    Station.add(name);
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
    Station.delete(dataset.name);
    this.render();
  },
  render() {
    const innerHTML = Station.list().reduce((prevHTML, station) => {
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

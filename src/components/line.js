import Station from "../Models/Station.js";

export default {
  page: null,
  isAddedEvent: false,
  init(page) {
    this.page = page;
    this.render();
    if (!this.isAddedEvent) {
      this.addEvents();
    }
    this.isAddedEvent = true;
  },
  render() {
    const HTMLreducer = (prevHTML, station) => prevHTML + `<option value="${station}" data-option-value="${station}">${station}</option>`;
    const innerHTML = Station.list().reduce(HTMLreducer, "");
    const $selectStart = document.querySelector("#line-start-station-selector");
    const $selectEnd = document.querySelector("#line-end-station-selector");
    $selectStart.innerHTML = innerHTML;
    $selectEnd.innerHTML = innerHTML;
  },
  addEvents() {},
};

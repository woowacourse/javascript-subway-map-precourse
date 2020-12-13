// import ManageStation from "./manage_station";

export default class EventUtils {
  constructor() {
    // this._privateManageStation = new ManageStation();
  }

  addEventToButton(button, callback) {
    button.addEventListener('click', () => {
      callback(button);
    });
  }

  deleteRowAndData(button) {
    const dataset = button.dataset.tracking;
    const row = document.querySelector(`[data-tracking="${dataset}"]`);

    this.deleteTableRow(row, button);
  }

  deleteTableRow(row) {
    row.remove();
  }

}
export default class EventUtils {
  constructor() {
    
  }

  addEventToButton(button) {
    button.addEventListener('click', () => {
      this.deleteRowAndData(button);
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
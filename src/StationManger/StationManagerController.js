import StationManagerView from './StationManagerView.js';

export default class StationManagerController {
  static ButtonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      if (eventId === 'add') {
        this.addButtonClicked();
      } else if (eventId === 'delete') {
        this.deleteButtonClicked();
      }
    });
  }

  static addButtonClicked() {
    alert('add');
  }

  static deleteButtonClicked() {
    alert('delete');
  }
}
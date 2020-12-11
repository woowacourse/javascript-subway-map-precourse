import SectionManagerView from './SectionManagerView.js';
import SectionManagerModel from './SectionManagerModel.js';

export default class SectionManagerController {
  static buttonEventController() {
    let line = null;
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      const eventClassName = event.target.className;
      if (eventId === 'section-add-button') {
        this.addButtonClicked(line);
      } else if (eventClassName === 'section-delete-button') {
        const button = event.path[0];
        this.deleteButtonClicked(line, button);
      } else if (eventClassName === 'section-line-menu-button') {
        const button = event.path[0];
        line = this.sectionLineMenuClicked(button);
      }
    });
  }

  static addButtonClicked(line) {
    const index = document.getElementById('section-order-input').value;
    const station = document.getElementById('section-station-selector').value;
    if (!SectionManagerModel.isValidNumber(line, index)
        || SectionManagerModel.isInLines(line, station)) {
      SectionManagerView.alertInputError();
      SectionManagerView.sectionInputView(line);
    } else {
      SectionManagerModel.add(line, station, index);
      SectionManagerView.sectionInputView(line);
      SectionManagerView.sectionTableView(line);
    }
  }

  static deleteButtonClicked(line, button) {
    const buttons = document.getElementsByClassName('section-delete-button');
    const buttonsArray = Array.from(buttons);
    const station = buttons[buttonsArray.indexOf(button)].dataset.deleteTarget;
    if (SectionManagerModel.checkNumOfStations(line, station)
        && SectionManagerView.confirmDelete()) {
      SectionManagerModel.delete(line, station);
      SectionManagerView.sectionTableView(line);
    } else {
      alert('삭제할 수 없습니다.');
    }
  }

  static sectionLineMenuClicked(button) {
    const buttons = document.getElementsByClassName('section-line-menu-button');
    const buttonsArray = Array.from(buttons);
    const line = buttons[buttonsArray.indexOf(button)].dataset.menu;
    SectionManagerView.sectionInputView(line);
    SectionManagerView.sectionTableView(line);
    return line;
  }
}

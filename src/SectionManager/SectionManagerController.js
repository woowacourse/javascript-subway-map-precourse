import SectionManagerView from './SectionManagerView.js';

export default class SectionManagerController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      const eventClassName = event.target.className;
      if (eventId === 'line-add-button') {
        this.addButtonClicked();
      } else if (eventClassName === 'line-delete-button') {
        const button = event.path[0];
        this.deleteButtonClicked(button);
      } else if (eventClassName === 'section-line-menu-button') {
        const button = event.path[0];
        this.sectionLineMenuClicked(button);
      }
    });
  }

  static addButtonClicked() {

  }

  static deleteButtonClicked() {

  }

  static sectionLineMenuClicked(button) {
    const buttons = document.getElementsByClassName('section-line-menu-button');
    const buttonsArray = Array.from(buttons);
    const line = buttons[buttonsArray.indexOf(button)].dataset.menu;
    SectionManagerView.sectionInputView(line);
    SectionManagerView.sectionTableView(line);
  }
}

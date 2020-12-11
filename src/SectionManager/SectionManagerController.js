import SectionManagerView from './SectionManagerView';

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

  addButtonClicked() {

  }

  deleteButtonClicked() {

  }

  sectionLineMenuClicked() {
    
  }
}
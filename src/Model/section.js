import {getLocalStorage} from '../Controller/local-storage.js';

export default class Section {
  constructor() {
    this.sections = [];
  }

  loadSection() {
    const sections = getLocalStorage('line');

    if (sections) {
      return (this.sections = sections);
    }
  }

  addSectionLine(userSection) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.lineName === userSection.lineName,
    );

    return this.sections[sectionIndex].station.splice(
      userSection.number,
      0,
      userSection.sectionName,
    );
  }

  removeSectionLine() {}
}

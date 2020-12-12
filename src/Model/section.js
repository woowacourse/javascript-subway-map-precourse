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

  addSectionLine() {}

  removeSectionLine() {}
}

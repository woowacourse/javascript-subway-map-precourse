import { Station } from '..';

export default class Line {
  constructor({ lineId, sections }) {
    this.lineId = lineId;
    this.sections = sections.map(section => {
      return new Station(section);
    });
  }

  getSections() {
    return [...this.sections];
  }

  addSection(sectionId, order) {
    this.sections.splice(order, 0, new Station(sectionId));
  }

  deleteSection(order) {
    this.sections.splice(order, 1);
  }
}

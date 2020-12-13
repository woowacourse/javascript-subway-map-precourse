import { Station } from '..';

export default class Line {
  constructor({ lineId, sections }) {
    this.lineId = lineId;
    // this.sections = [new Station(startStation), new Station(endStation)];
    this.sections = sections.map(section => {
      return new Station(section);
    });
  }

  getSections() {
    return [...this.sections];
  }

  addSection(sectionId, order) {
    const sections = [...this.sections];
    sections.splice(order, 0, new Station(sectionId));

    this.sections = sections;
  }

  deleteSection(order) {
    const sections = [...this.sections];
    sections.splice(order, 1);

    this.sections = sections;
  }
}

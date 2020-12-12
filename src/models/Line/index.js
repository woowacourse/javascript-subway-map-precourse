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
    console.log('call add');
    const sections = [...this.sections];
    sections.splice(order, 0, new Station(sectionId));

    this.sections = sections;
  }

  deleteSection(order) {
    console.log('call delete');
    const sections = [...this.sections];
    sections.splice(order, 1);

    this.sections = sections;
  }
}

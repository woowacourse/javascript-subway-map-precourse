import { Station } from '..';

export default class Line {
  constructor(lineObject) {
    this.lineId = lineObject.lineId;
    this.sections = [
      new Station(lineObject.startStation),
      new Station(lineObject.endStation),
    ];
    this.startStation = lineObject.startStation;
    this.endStation = lineObject.endStation;
  }

  getsections() {
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

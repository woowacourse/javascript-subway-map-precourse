import { Station } from '..';

export default class Line {
  constructor({ lineId, sections }) {
    this._lineId = lineId;
    this._sections = sections.map(section => {
      return new Station(section);
    });
  }

  getSections() {
    return [...this._sections];
  }

  addSection(sectionId, order) {
    this._sections.splice(order, 0, new Station(sectionId));
  }

  deleteSection(order) {
    this._sections.splice(order, 1);
  }
}

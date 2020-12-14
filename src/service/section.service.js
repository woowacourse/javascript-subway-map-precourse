import { Line } from "./line.service.js";
class Section extends Line {
  constructor() {
    super();

    this.START_SECTION_ORDER = 0;
    this.MIN_SECTION_STATION_COUNT = 2;
  }

  getSectionsByLineName(lineName) {
    const rawSections = this.storage.getItem(lineName);
    if (!rawSections) {
      return [];
    }

    const sections = rawSections.split(",");
    return sections;
  }

  addSection(lineName, stationName, order) {
    const sections = this.getSectionsByLineName(lineName);
    sections.splice(order, this.START_SECTION_ORDER, stationName);

    this.storage.setItem(lineName, sections);
  }

  removeSection(lineName, stationName) {
    const sections = this.getSectionsByLineName(lineName);
    const order = sections.indexOf(stationName);

    sections.splice(order, this.DELETED_ITEM_COUNT);

    this.storage.setItem(lineName, sections);
  }

  findSectionByStationName(stationName) {
    const allLines = this.getAllLines();

    const allLinesSections = allLines.map((lineName) => this.getSectionsByLineName(lineName));
    const station = allLinesSections.filter((sections) => {
      return sections.includes(stationName);
    });

    return station;
  }

  findSectionByLineAndStationName(lineName, stationName) {
    const sections = this.getSectionsByLineName(lineName);
    return sections.includes(stationName);
  }

  hasMinStationCount(lineName) {
    const stationCount = this.getSectionsByLineName(lineName).length;

    return stationCount === this.MIN_SECTION_STATION_COUNT;
  }
}

const section = new Section();
export default section;

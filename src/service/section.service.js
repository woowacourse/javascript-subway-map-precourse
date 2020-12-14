class Section {
  constructor() {
    this.storage = window.localStorage;

    this.START_SECTION_ORDER = 0;
    this.DELETED_ITEM_COUNT = 1;
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

  findSectionByLineAndStation(lineName, stationName) {
    const sections = this.getSectionsByLineName(lineName);
    return sections.includes(stationName);
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

  hasMinStationCount(lineName) {
    const stationCount = this.getSectionsByLineName(lineName).length;

    return stationCount === this.MIN_SECTION_STATION_COUNT;
  }
}

const section = new Section();
export default section;

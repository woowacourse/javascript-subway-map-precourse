class Line {
  constructor() {
    this.storage = window.localStorage;
    this.DELETED_LINE_COUNT = 1;
    this.START_SECTION_ORDER = 0;
  }

  getAllLines() {
    const rawLines = this.storage.getItem("lines");
    if (!rawLines) {
      return [];
    }

    const lines = rawLines.split(",");
    return lines;
  }

  createLine(lineName, startStation, endStation) {
    const allLines = this.getAllLines();
    allLines.push(lineName);

    this.storage.setItem(`lines`, allLines);
    this.storage.setItem(lineName, `${startStation},${endStation}`);
  }

  deleteLine(lineName) {
    const allLines = this.getAllLines();
    const index = allLines.indexOf(lineName);

    allLines.splice(index, this.DELETED_LINE_COUNT);

    this.storage.setItem(`lines`, allLines);
    this.storage.removeItem(lineName);
  }

  getSectionsByLineName(lineName) {
    const rawSections = this.storage.getItem(lineName);
    if (!rawSections) {
      return [];
    }

    const sections = rawSections.split(",");
    return sections;
  }

  hasSameName(newLineName) {
    const allLines = this.getAllLines();
    const duplicates = allLines.filter((lineName) => lineName === newLineName);
    const hasSameName = duplicates.length;

    return hasSameName;
  }

  isStationIncluded(stationName) {
    const allLines = this.getAllLines();

    const allLinesSections = allLines.map((lineName) => this.storage.getItem(lineName));
    const includedStation = allLinesSections.filter((sections) => {
      return sections.split(",").includes(stationName);
    });

    return includedStation.length;
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
}

const line = new Line();
export default line;

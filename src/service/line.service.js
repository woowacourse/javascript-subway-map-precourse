class Line {
  constructor() {
    this.storage = window.localStorage;
    this.DELETED_ELEMENT_COUNT = 1;
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

    allLines.splice(index, this.DELETED_ELEMENT_COUNT);

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
}

const line = new Line();
export default line;

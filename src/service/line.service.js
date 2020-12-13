class Line {
  constructor() {
    this.storage = window.localStorage;
  }

  getAllLines() {
    const rawLines = this.storage.getItem("lines");
    if (!rawLines) {
      return [];
    }

    const lines = rawLines.split(",");
    return lines;
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

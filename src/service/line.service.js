export class Line {
  constructor() {
    this.storage = window.localStorage;

    this.ENTITY_NAME = "lines";
    this.MIN_NAME_LENGTH = 3;
    this.DELETED_ITEM_COUNT = 1;
  }

  getAllLines() {
    const rawLines = this.storage.getItem(this.ENTITY_NAME);
    if (!rawLines) {
      return [];
    }

    const lines = rawLines.split(",");
    return lines;
  }

  createLine(lineName, startStation, endStation) {
    const allLines = this.getAllLines();
    allLines.push(lineName);

    this.storage.setItem(this.ENTITY_NAME, allLines);
    this.storage.setItem(lineName, `${startStation},${endStation}`);
  }

  deleteLine(lineName) {
    const allLines = this.getAllLines();
    const index = allLines.indexOf(lineName);

    allLines.splice(index, this.DELETED_ITEM_COUNT);

    this.storage.setItem(this.ENTITY_NAME, allLines);
    this.storage.removeItem(lineName);
  }

  findLineByName(lineName) {
    const allLines = this.getAllLines();
    const line = allLines.filter((name) => name === lineName);

    return line;
  }
}

export const line = new Line();

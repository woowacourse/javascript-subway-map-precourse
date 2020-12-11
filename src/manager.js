export function Manager() {
  this.lineList = [];
  this.stationList = [];
  this.selectedLine = null;
  this.setStationInManager = (station) => {
    this.stationList.push(station);
  };
  this.setLineInManager = (line) => {
    this.lineList.push(line);
  };
  this.getAllLineName = () => {
    let lineNameList = [];
    for (let i in lineList) {
      lineNameList.push(this.lineList[i].name);
    }

    return lineNameList;
  };
  this.setSelectedLine = (selectedLine) => {
    this.selectedLine = selectedLine;
  };
  this.getSelectedLine = () => {
    return this.selectedLine;
  };
  this.setChangedLine = (changedLine) => {
    this.lineList.forEach((line) => {
      if (line.name === changedLine.name) {
        line = changedLine;
      }
    });
  };
}
export const manager = new Manager();

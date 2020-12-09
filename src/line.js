export default function Line(name) {
  this.name = name;
  this.length = 0;
  this.head = null;

  Line.prototype.addLine = (startStation, endStation) => {
    this.head = startStation;
    this.head.next = endStation;
    this.length += 2;
  };
  Line.prototype.getStartStation = () => {
    return this.head.name;
  };
  Line.prototype.getEndStation = () => {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    return current.name;
  };
  Line.prototype.getAllStation = () => {
    let stationList = [];
    let current = this.head;
    while (current.next) {
      stationList.push(current.name);
      current = current.next;
    }
    stationList.push(current.name);
    return stationList;
  };

  Line.prototype.addStationToIdx = (station, idx) => {
    const addStation = station;
    let currentIdx = 0;
    let currentStation = this.head;
    while (currentIdx < idx - 1) {
      currentStation = currentStation.next;
      currentIdx++;
    }
    addStation.next = currentStation.next;
    currentStation.next = addStation;
    this.length += 1;
  };
}

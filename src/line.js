import { manager } from "./manager.js";

export default function Line(name) {
  this.name = name;
  this.length = 0;
  this.head = null;
  this.addLine = (startStation, endStation) => {
    this.head = startStation;
    this.head.next = endStation;
    this.length += 2;

    startStation.addIncludedLine(this.name);
    endStation.addIncludedLine(this.name);
  };
  this.getStartStation = () => {
    return this.head.name;
  };
  this.getEndStation = () => {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    return current.name;
  };
  this.getAllStationName = () => {
    let stationList = [];
    let current = this.head;
    while (current.next) {
      stationList.push(current.name);
      current = current.next;
    }
    stationList.push(current.name);

    return stationList;
  };
  this.addStationInIdx = (station, idx) => {
    const addStation = station;
    let currentIdx = 0;
    let currentStation = this.head;
    while (currentIdx < idx - 1) {
      currentStation = currentStation.next;
      currentIdx++;
    }
    addStation.next = currentStation.next;
    currentStation.next = addStation;
    this.length++;
    manager.setChangedLine(this);

    station.addIncludedLine(this.name);
  };
  this.deleteStationInIdx = (idx, selectedLine) => {
    let currentIdx = 0;
    let currentStation = this.head;
    while (currentIdx < idx - 1) {
      currentStation = currentStation.next;
      currentIdx++;
    }
    currentStation.next.deleteIncludedLine(selectedLine);
    currentStation.next.next = null;
    currentStation.next = currentStation.next.next;
    this.length--;
    manager.setChangedLine(this);
  };
}

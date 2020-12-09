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
}

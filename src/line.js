export default function Line(name) {
  this.name = name;
  this.length = 0;
  this.head = null;

  Line.prototype.addLine = (startStation, endStation) => {
    this.head = startStation;
    this.head.next = endStation;
    this.length += 2;
  };
}

function Line(name, endStops) {
  this.name = name;
  this.stops = [endStops[0], endStops[1]];
}

function Station(name) {
  this.name = name;
  this.line = [];
}
export { Line, Station };

export default function Subway() {
  this.station = [];
  this.line = [];
}

Subway.prototype.isValidName = function (inputValue, name, LIMIT_VALUE) {
  return (
    inputValue.trim().length >= LIMIT_VALUE &&
    this[name].every((v) => v.name !== inputValue)
  );
};

Subway.prototype.isValidDeleteStation = function (id) {
  const stationIndex = this.station.findIndex((v) => v.id === id);
  if (!this.station[stationIndex].hasOwnProperty("line")) {
    return true;
  }
};

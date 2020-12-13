import { STATION_NAME_LIMIT } from "./constant.js";
export default function Subway() {
  this.station = [];
  this.line = [];
}

Subway.prototype.isValidStation = function (stationInput) {
  return (
    stationInput.trim().length >= STATION_NAME_LIMIT &&
    this.station.every((v) => v.name !== stationInput)
  );
};

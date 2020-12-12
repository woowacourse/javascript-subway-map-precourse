export default class UserException {
  isValidNameLength(name) {
    return name.length >= 2;
  }

  isDuplicatedName(stations, stationName) {
    return stations.some((station) => station.name === stationName);
  }
}

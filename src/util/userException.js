export default class UserException {
  isValidNameLength(name) {
    return name.length >= 2;
  }

  isDuplicatedName(nameList, stationName) {
    return nameList.some((name) => name.station === stationName);
  }
}

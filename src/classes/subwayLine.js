export default class SubwayLine {
  static checkIsTerminatingStationsSame(
    upTerminatingStationName,
    downTerminatingStationName
  ) {
    return downTerminatingStationName === upTerminatingStationName;
  }

  constructor(name, upTerminatingStation, downTerminatingStation) {
    this.name = name;
    this.upTerminatingStation = upTerminatingStation;
    this.downTerminatingStation = downTerminatingStation;
  }

  #getNextStationInLine(station) {
    const nextStationInLine = station.nextStations.find((nextStation) =>
      nextStation.belongingLineNames.some((lineName) => lineName === this.name)
    );

    return nextStationInLine;
  }

  get allStations() {
    const allStations = [];
    let nextStation = this.#getNextStationInLine(this.upTerminatingStation);
    while (nextStation) {
      allStations.push(allStations);
      nextStation = this.#getNextStationInLine(nextStation);
    }

    return allStations;
  }
}

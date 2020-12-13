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
}

export default class SubwayLine {
  static checkIsTerminatingStationsSame(
    upTerminatingStationName,
    downTerminatingStationName
  ) {
    return downTerminatingStationName === upTerminatingStationName;
  }

  constructor(upTerminatingStationName, downTerminatingStationName) {
    this.upTerminatingStationName = upTerminatingStationName;
    this.downTerminatingStationName = downTerminatingStationName;
  }
}

export default class SubwayMapViewModel {
  constructor(subwayMapModel) {
    this.subwayMapModel = subwayMapModel;
  }

  // setProxy() {
  //   return new Proxy(this, {
  //     set(target, property, value) {
  //       if (property === 'stations') {
  //         target.subwayMapModel.addStation(value);
  //         console.log(target.subwayMapModel.getStation());
  //       }

  //       return true;
  //     },
  //   });
  // }

  getStations() {
    return this.subwayMapModel.getStations();
  }

  addStation(stationId) {
    this.subwayMapModel.addStation(stationId);
  }
}

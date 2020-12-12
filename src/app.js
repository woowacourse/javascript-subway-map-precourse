import SubwayMap from './subway_map.js';

export default class App {
  constructor() {
    this.subwayMap = new SubwayMap();
    this.subwayMap.activate();
  }
}

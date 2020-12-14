import Line from './line/line.js';
import Station from './station/station.js';

export default class SubwayManagementSystem {
  constructor() {
    new Station();
    new Line();
  }
}

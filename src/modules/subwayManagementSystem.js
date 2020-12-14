import Line from './line.js';
import Station from './station.js';

export default class SubwayManagementSystem {
  constructor() {
    new Station();
    new Line();
  }
}

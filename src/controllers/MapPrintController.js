import LineModel from '../models/LineModel.js';
import MapPrintView from '../views/MapPrintView.js';

export default class MapPrintController {
  constructor() {
    this.elements = {};

    this.lineModel = new LineModel();
    this.MapPrintView = new MapPrintView(this.lineModel.data);
  }
}

import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Storage } from "../util/storage.js";
import { MapView } from "../view/map-view.js";

export const MapManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key);
    Line.lines = Storage.load(Line.key);
    MapView.render();
  }
}
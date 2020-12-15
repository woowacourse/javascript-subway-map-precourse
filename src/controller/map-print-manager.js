import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Storage } from "../util/storage.js";
import { MapPrintView } from "../view/map-print-view.js";

export const MapPrintManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key)
      ? Storage.load(Station.key)
      : [];
    Line.lines = Storage.load(Line.key) ? Storage.load(Line.key) : [];
    MapPrintView.render();
  },
};

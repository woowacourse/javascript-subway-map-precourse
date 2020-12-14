import { Station } from "../model/station.js";
import { Storage } from "../util/storage.js";
import { LineView } from "../view/line-view.js";

export const LineManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key);
    LineView.render();
  },
};

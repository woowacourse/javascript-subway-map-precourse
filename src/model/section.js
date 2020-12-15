import { Storage } from "../util/storage.js";
import { Line } from "./line.js";

export const Section = {
  add(station, order, line) {
    const stationArray = Line.lines.filter(({ name }) => name === line)[0]
      .stations;

    stationArray.splice(order, 0, station);
    Storage.save(Line.key, Line.lines);
  },

  delete(idx, line) {
    const stationArray = Line.lines.filter(({ name }) => name === line)[0]
      .stations;

    stationArray.splice(idx, 1);
    Storage.save(Line.key, Line.lines);
  },
};

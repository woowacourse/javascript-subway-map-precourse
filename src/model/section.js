import { Storage } from "../util/storage.js";
import { Line } from "./line.js";

export const Section = {
  add(station, order, line) {
    const stationArray = Line.lines.filter(({ name }) => name === line)[0]
      .stations;

    //
    stationArray.splice(order, 0, station);
    Storage.save(Line.key, Line.lines);
    // 원래 index에 넣기 - 인덱스 구해서 넣고 다음 인덱스 삭제
    // 교체하면 안될까?
    // console.log(Line.lines);
    // Line.lines.forEach(({ name, stations }) => {
    //   console.log(name, stations);
    // })
    // Line.lines = Line.lines.filter(({ name }) => name !== line);
  },

  delete(idx, line) {
    const stationArray = Line.lines.filter(({ name }) => name === line)[0]
      .stations;

    stationArray.splice(idx, 1);
    Storage.save(Line.key, Line.lines);
  },
};

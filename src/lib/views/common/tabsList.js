import {
  LINE_DIV,
  MAP_DIV,
  SECTION_DIV,
  STATION_DIV,
} from "../../common/IdAndClassNames.js";

export default [
  { title: "역", querySelector: STATION_DIV },
  { title: "노선", querySelector: LINE_DIV },
  { title: "구간", querySelector: SECTION_DIV },
  { title: "출력", querySelector: MAP_DIV },
];

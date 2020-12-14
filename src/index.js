import Subway from "./Subway.js";
import { cleanView } from "./utils/controlView.js";
import { stationInit } from "./utils/station.js";
import { lineInit } from "./utils/line.js";
import { sectionInit } from "./utils/section.js";
import { printMapInit } from "./utils/mapPrint.js";
const init = () => {
  cleanView();
  let subway = new Subway();
  stationInit.call(subway);
  lineInit.call(subway);
  sectionInit.call(subway);
  printMapInit.call(subway);
};

init();

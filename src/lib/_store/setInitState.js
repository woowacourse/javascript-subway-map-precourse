import { stationSelector, lineSelector } from "./selectors.js";

const initState = {
  stations: [],
  lines: [],
};

export default () => {
  console.log(localStorage);

  initState.stations = stationSelector;
  initState.lines = lineSelector;

  console.log(initState);
};

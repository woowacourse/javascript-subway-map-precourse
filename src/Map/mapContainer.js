import { loadLines } from "../Line/lineContainer.js";

export const loadMapInfo = () => {
  const lines = loadLines() || [];

  const lineArray = lines.map((line) => Object.keys(line)[0]);
  const stationArray = lines.map((line) => Object.values(line)[0]);

  return { lineArray, stationArray };
};

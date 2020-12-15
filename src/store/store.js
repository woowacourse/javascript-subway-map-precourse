import StationMap from '../classes/subwayMap.js';
import { getItemByKey, setItemWithKey } from '../utils/localStorage.js';
import { SUBWAY_MAP_ITEM_NAME } from '../constants/configuration.js';
import SubwayStation from '../classes/subwayStation.js';
import SubwayLine from '../classes/subwayLine.js';

export const subwayMap = new StationMap();

export const syncSubwayMapToLocalStorage = () => {
  const subwayMapItem = {
    allStations: subwayMap.allStations,
    allLines: subwayMap.allLines,
  };
  setItemWithKey(subwayMapItem, SUBWAY_MAP_ITEM_NAME);
};

const copyAllStations = (allStations) => {
  Object.keys(allStations).forEach((stationName) => {
    const loadedStation = allStations[stationName];
    const station = new SubwayStation();
    loadedStation.belongingLineNames.forEach((belongingLineName) => {
      station.addBeloningLineByLineName(belongingLineName);
    });
    subwayMap.addStation(station, stationName);
  });
};

const copyAllLines = (allLines) => {
  Object.keys(allLines).forEach((lineName) => {
    const loadedLine = allLines[lineName];
    const loadedLineEndIndex = loadedLine.allStationsInLine.length - 1;
    const line = new SubwayLine(
      loadedLine.allStationsInLine[0],
      loadedLine.allStationsInLine[loadedLineEndIndex]
    );
    for (let i = loadedLine.length - 2; i > 0; i -= 1) {
      line.insertStationToLineByNameAndIndex(
        loadedLine.allStationsInLine[i],
        1
      );
    }
    subwayMap.addLine(line, lineName);
  });
};

export const syncSubwayMapFromLocalStorage = () => {
  const subwayMapItem = getItemByKey(SUBWAY_MAP_ITEM_NAME);
  const { allStations, allLines } = subwayMapItem;
  copyAllStations(allStations);
  copyAllLines(allLines);
  console.log(subwayMap);
};

export default {
  subwayMap,
  syncSubwayMapToLocalStorage,
  syncSubwayMapFromLocalStorage,
};

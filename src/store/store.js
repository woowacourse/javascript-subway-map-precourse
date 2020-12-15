import StationMap from '../classes/subwayMap.js';
import { getItemByKey, setItemWithKey } from '../utils/localStorage.js';
import { SUBWAY_MAP_ITEM_NAME } from '../constants/configuration.js';

export const subwayMap = new StationMap();

export const syncSubwayMapToLocalStorage = () => {
  const subwayMapItem = {
    stations: subwayMap.allStations,
    lines: subwayMap.allLines,
  };
  setItemWithKey(subwayMapItem, SUBWAY_MAP_ITEM_NAME);
};

export const syncSubwayMapFromLocalStorage = () => {
  const subwayMapItem = getItemByKey(SUBWAY_MAP_ITEM_NAME);
};

export default {
  subwayMap,
  syncSubwayMapToLocalStorage,
  syncSubwayMapFromLocalStorage,
};

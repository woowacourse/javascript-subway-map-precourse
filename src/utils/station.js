import * as storageKey from "../constants/storageKey.js";
import { getStateFromStorage, setStateToStorage } from "./storage.js";

export const existStationName = (name) => {
  const stations = getStateFromStorage(storageKey.STATIONS);
  if (!stations) {
    return false;
  }
  return stations.indexOf(name) > -1;
};

export const removeStation = (name) => {
  const stations = getStateFromStorage(storageKey.STATIONS);
  if (stations === null) {
    return;
  }
  setStateToStorage(
    storageKey.STATIONS,
    stations.filter((el) => el !== name)
  );
};

export const pushNewStation = (station) => {
  const previousStations = getStateFromStorage(storageKey.STATIONS);
  const newStations = previousStations
    ? [...previousStations, station]
    : [station];
  setStateToStorage(storageKey.STATIONS, newStations);
};

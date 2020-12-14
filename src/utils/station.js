import { LOCAL_STORAGE_STATIONS_KEY } from "../constants/index.js";
import { getStateFromStorage, setStateToStorage } from "./storage.js";

export const existStationName = (name) => {
  const stations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  if (!stations) {
    return false;
  }
  return stations.indexOf(name) > -1;
};

export const removeStation = (name) => {
  const stations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  if (stations === null) {
    return;
  }
  setStateToStorage(
    LOCAL_STORAGE_STATIONS_KEY,
    stations.filter((el) => el !== name)
  );
};

export const pushNewStation = (station) => {
  const previousStations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  const newStations = previousStations
    ? [...previousStations, station]
    : [station];
  setStateToStorage(LOCAL_STORAGE_STATIONS_KEY, newStations);
};

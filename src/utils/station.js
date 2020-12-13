const LOCAL_STORAGE_STATIONS_KEY = "STATIONS";

export const getStations = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATIONS_KEY));
};

export const setStations = (stations) => {
  return localStorage.setItem(
    LOCAL_STORAGE_STATIONS_KEY,
    JSON.stringify(stations)
  );
};

export const existStationName = (name) => {
  const stations = getStations();
  if (!stations) {
    return false;
  }
  return stations.indexOf(name) > -1;
};

export const removeStation = (name) => {
  const stations = getStations();
  if (stations === null) {
    return;
  }
  setStations(stations.filter((el) => el !== name));
};

export const pushNewStation = (station) => {
  const previousStations = getStations();
  const newStations = previousStations
    ? [...previousStations, station]
    : [station];
  setStations(newStations);
};

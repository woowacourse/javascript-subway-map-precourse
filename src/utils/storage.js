import Station from "../models/Station.js";

const loadStorage = key => {
  try {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : {};
  } catch (err) {
    console.error(err);
  }
};

export const loadStations = key => {
  const stations = Array.from(loadStorage(key));

  return stations.map(({ name, lines }) => {
    const station = new Station(name);
    station.lines = new Set(lines);

    return station;
  });
};

export const saveStations = (key, stations) => {
  try {
    const saveData = JSON.stringify(
      stations.map(station => {
        station.lines = Array.from(station.lines);
        return station;
      }),
    );

    localStorage.setItem(key, saveData);
  } catch (err) {
    console.error(err);
  }
};

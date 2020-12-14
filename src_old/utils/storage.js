import Line from "../models/Line.js";
import Station from "../models/Station.js";

const loadStorage = key => {
  try {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : [];
  } catch (err) {
    console.error(err);
  }
};

export const loadStations = key => {
  const stations = loadStorage(key);

  return stations.map(({ name, lines }) => {
    const station = new Station(name);
    station.lines = lines;

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

export const loadLines = key => {
  const lines = loadStorage(key);

  return lines.map(({ name, sections }) => {
    const line = new Line(name, sections[0], sections[sections.lenght - 1]);
    line.sections = sections;

    return line;
  });
};

export const saveLines = (key, lines) => {
  try {
    localStorage.setItem(key, JSON.stringify(lines));
  } catch (err) {
    console.error(err);
  }
};

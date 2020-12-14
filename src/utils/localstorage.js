import Station from '../station.js';
import Line from '../line.js';

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const load = key => {
  const array = JSON.parse(localStorage.getItem(key)) || [];
  if (key === 'stations') {
    return jsonToStations(array);
  }

  if (key === 'lines') {
    return jsonToLines(array);
  }

  return array;
};

const jsonToStations = array => {
  return array.map(({ name }) => new Station(name));
};

const jsonToLines = array => {
  return array.map(
    ({ name, stations }) =>
      new Line(
        name,
        stations.map(({ name }) => new Station(name))
      )
  );
};

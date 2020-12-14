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
  console.log(array);
  console.log(array.map(station => new Station(station)));
  return array.map(station => new Station(station));
};
const jsonToLines = array => {
  return array.map(line => new Line(line));
};

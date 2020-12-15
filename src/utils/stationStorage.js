import { STATION_STORAGE_NAME } from './constant.js';

export default function stationStorage() {
  const getStations = () => {
    if (!localStorage.getItem(STATION_STORAGE_NAME)) {
      return [];
    }
    const storedItems = localStorage.getItem(STATION_STORAGE_NAME);
    return JSON.parse(storedItems);
  };

  const setStation = (station) => {
    localStorage.setItem(STATION_STORAGE_NAME, JSON.stringify(station));
  };

  const getStationIdByName = (stationName) => {
    return getStations().filter((station) => station.name === stationName)[0].id;
  };

  const getStationById = (stationId) => {
    return getStations().filter((station) => station.id === stationId)[0];
  };

  return {
    getStations,
    setStation,
    getStationIdByName,
    getStationById,
  };
}

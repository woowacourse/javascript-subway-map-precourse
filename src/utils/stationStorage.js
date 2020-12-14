import { STATION_STORAGE_NAME } from './constant.js';

export default function stationStorage() {
  const getStation = () => {
    if (!localStorage.getItem(STATION_STORAGE_NAME)) {
      return [];
    }
    const storedItems = localStorage.getItem(STATION_STORAGE_NAME);
    return JSON.parse(storedItems);
  };

  const setStation = (station) => {
    localStorage.setItem(STATION_STORAGE_NAME, JSON.stringify(station));
  };

  return {
    getStation,
    setStation,
  };
}

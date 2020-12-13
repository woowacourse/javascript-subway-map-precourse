import { LOCAL_STORAGE_STATIONS_KEY } from "../constant.js";
import { getStateFromStorage } from "./storage.js";

export const getStationOptions = () => {
  const stations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  if (!stations) {
    return null;
  }
  return stations.map((el) => `<option value="${el}">${el}</option>`).join("");
};

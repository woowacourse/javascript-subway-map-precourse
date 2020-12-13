import { SUB_WAY_INFO } from "../constant.js";
export const getDataFromLocalStorage = (subwayInfo) => {
  const dataFromStorage = localStorage.getItem(SUB_WAY_INFO);
  if (dataFromStorage !== null) {
    subwayInfo = JSON.parse(dataFromStorage);
  }
};

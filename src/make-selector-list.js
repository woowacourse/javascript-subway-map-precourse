import { manager } from "./manager.js";

export const pushStation = (sameName, name, stationList) => {
  if (sameName.length === 0) {
    return stationList.filter(
      (station) => station.name === name && station.isIncluded === null
    )[0];
  } else {
    return sameName[0];
  }
};
export const makeStationList = () => {
  const finalStationList = [];
  const stationList = manager.stationList;
  const stationName = stationList.map((station) => {
    return station.name;
  });
  const stationNameSet = Array.from(new Set(stationName));
  stationNameSet.forEach((name) => {
    const sameName = stationList.filter(
      (station) => station.name === name && station.isIncluded !== null
    );
    finalStationList.push(pushStation(sameName, name, stationList));
  });

  return finalStationList;
};
export const makeStationOption = (optionName) => {
  const StationListInOption = makeStationList();
  const optionList = document.getElementById(optionName);
  optionList.innerHTML = ""; // 선택 노선 변경 시 지하철 역 새로 load
  for (let idx in StationListInOption) {
    const newOption = document.createElement("option");
    newOption.innerHTML = StationListInOption[idx].name;
    optionList.appendChild(newOption);
  }
};

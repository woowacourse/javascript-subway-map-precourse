import { manager } from "./manager.js";

export const makeLineNameUI = (lineName) => {
  const lineNameBox = document.createElement("div");
  lineNameBox.innerHTML = lineName;

  return lineNameBox;
};
export const makeStationInLineUI = (line) => {
  const stationBox = document.createElement("ul");
  const stationList = line.getAllStationName();
  stationList.forEach((station) => {
    const oneStation = document.createElement("li");
    oneStation.innerHTML = station;
    stationBox.appendChild(oneStation);
  });

  return stationBox;
};
export const makeMapUI = (line) => {
  const oneMap = document.createElement("div");
  const lineNameBox = makeLineNameUI(line.name);
  const stationBox = makeStationInLineUI(line);
  oneMap.append(lineNameBox, stationBox);

  return oneMap;
};
export const showMapList = () => {
  const lineList = manager.lineList;
  const mapPrintResult = document.getElementById("map-print-manager-result");
  const mapList = document.createElement("div");
  mapPrintResult.innerHTML = ""; // 버튼 누를때 마다 map 추가되지 않게 초기화
  mapList.setAttribute("class", "map");
  lineList.forEach((line) => {
    const map = makeMapUI(line); // 라인 하나의 map그리기
    mapList.appendChild(map);
  });
  mapPrintResult.appendChild(mapList);
};

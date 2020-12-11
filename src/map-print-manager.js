import { manager } from "./manager.js";

export const showLineTitleInMap = (lineName) => {
  const lineNameBox = document.createElement("div");
  lineNameBox.innerHTML = lineName;

  return lineNameBox;
};
export const showStationInMap = (line) => {
  const stationBox = document.createElement("ul");
  const stationList = line.getAllStationName();
  stationList.forEach((station) => {
    const oneStation = document.createElement("li");
    oneStation.innerHTML = station;
    stationBox.appendChild(oneStation);
  });

  return stationBox;
};
export const showMap = (line) => {
  const oneMap = document.createElement("div");
  const lineNameBox = showLineTitleInMap(line.name);
  const stationBox = showStationInMap(line);
  oneMap.appendChild(lineNameBox);
  oneMap.appendChild(stationBox);

  return oneMap;
};
export const showMapList = () => {
  const lineList = manager.lineList;
  const mapPrintResult = document.getElementById("map-print-manager-result");
  const mapList = document.createElement("div");
  mapPrintResult.innerHTML = ""; // 버튼 누를때 마다 map 추가되지 않게 초기화
  mapList.setAttribute("class", "map");
  lineList.forEach((line) => {
    const map = showMap(line); // 라인 하나의 map그리기
    mapList.appendChild(map);
  });
  mapPrintResult.appendChild(mapList);
};

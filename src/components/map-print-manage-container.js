import { state } from "../index.js";

function printAllLineAndStations(elementToAppend, subwayLines) {
  for (const line of subwayLines) {
    printLineName(elementToAppend, line.lineName);
    printStation(elementToAppend, line.stations);
  }
}

function printLineName(elementToAppend, lineName) {
  const h2 = document.createElement("h2");

  h2.append(lineName);
  elementToAppend.append(h2);
}

function printStation(elementToAppend, stationArray) {
  for (const station of stationArray) {
    const stationsInLine = document.createElement("li");
    stationsInLine.append(station.stationName);
    elementToAppend.append(stationsInLine);
  }
}

export default function mapPrintManageContainer() {
  const parent = document.getElementById("manage-map-print");
  const div = document.createElement("div");

  if (state.subwayLines.length) {
    printAllLineAndStations(div, state.subwayLines);
  } else {
    const title = `<h2>노선이 없습니다.<br />노선에 아래의 역들을 등록해 주세요.</h2>`;
    const titleElement = new DOMParser().parseFromString(title, "text/html").firstElementChild;
    div.append(titleElement);
    printStation(div, state.stationArray);
  }

  parent.append(div);
}

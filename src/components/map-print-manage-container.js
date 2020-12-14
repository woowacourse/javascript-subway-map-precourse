import { state } from "../index.js";

export default function mapPrintManageContainer() {
  const parent = document.getElementById("manage-map-print");
  const div = document.createElement("div");

  for (const line of state.subwayLines) {
    const lineName = document.createElement("h2");

    lineName.append(line.lineName);
    div.append(lineName);
    for (const station of line.stations) {
      const stationsInLine = document.createElement("li");
      stationsInLine.append(station.stationName);
      div.append(stationsInLine);
    }
  }
  parent.append(div);
}

import renderStation from "./renderStation.js";
import renderLine from "./renderLine.js";
import renderMapPrint from "./renderMapPrint.js";

export default function render(name) {
  if (name === "station") {
    renderStation();
  } else if (name === "line") {
    renderLine();
  } else if (name === "section") {
    renderSection();
  } else if (name === "mapPrint") {
    renderMapPrint();
  }
}

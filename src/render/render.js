import renderStation from "./renderStation";

import renderStation from "./renderStation.js";
import renderLine from "./renderLine.js";
export default function render(name) {
  if (name === "station") {
    renderStation();
  } else if (name === "line") {
    renderLine();
  }
}

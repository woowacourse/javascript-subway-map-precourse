import LineManager from "./pages/lineManager.js";
import PrintSubwayLine from "./pages/PrintSubwayLine.js";
import SectionManager from "./pages/SectionManager.js";
import StationManager from "./pages/StationManager.js";

export const elementMap = [
  {
    page: StationManager,
    button: document.getElementById("station-manager-button"),
  },
  {
    page: LineManager,
    button: document.getElementById("line-manager-button"),
  },
  {
    page: SectionManager,
    button: document.getElementById("section-manager-button"),
  },
  {
    page: PrintSubwayLine,
    button: document.getElementById("map-print-manager-button"),
  },
];

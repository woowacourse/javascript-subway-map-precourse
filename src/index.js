import Station from "./modules/Station.js";
import Line from "./modules/Line.js";
import StationManager from "./modules/StationManager.js";
import LineManager from "./modules/LineManager.js";
import SectionManager from "./modules/SectionManager.js";
import MapPrintManager from "./modules/MapPrintManager.js";

const managerButtons = document.querySelectorAll(
  ".manager-button-group button"
);
const stationManagerButton = document.querySelector("#station-manager-button");
const lineManagerButton = document.querySelector("#line-manager-button");
const sectionManagerButton = document.querySelector("#section-manager-button");
const mapPrintManagerButton = document.querySelector(
  "#map-print-manager-button"
);

function activeSelectedContainer(container, isSelected) {
  if (isSelected) {
    container.classList.add("active");
  }
}

function hideContainer(container) {
  container.classList.remove("active");
}

function checkSelectedContainer(selectedButton) {
  const contentsContainers = document.querySelectorAll(".contents-container");
  contentsContainers.forEach(container => {
    container.classList.remove("active");

    const isSelected = container.dataset.title === selectedButton;
    activeSelectedContainer(container, isSelected);
  });
}

function handleManagerButton(e) {
  const addSectionContainer = document.querySelector("#add-section-container");
  const selectedButton = e.target.dataset.title;
  checkSelectedContainer(selectedButton);
  hideContainer(addSectionContainer);
}

function updateManager(manager) {
  manager.updateView();
}

const station = new Station();
const line = new Line(station);
const stationManager = new StationManager(station);
const lineManager = new LineManager(station, line);
const sectionManager = new SectionManager(station, line);
const mapPrintManager = new MapPrintManager(line);

managerButtons.forEach(managerButton =>
  managerButton.addEventListener("click", handleManagerButton)
);
stationManagerButton.addEventListener("click", () =>
  updateManager(stationManager)
);
lineManagerButton.addEventListener("click", () => updateManager(lineManager));
sectionManagerButton.addEventListener("click", () =>
  updateManager(sectionManager)
);
mapPrintManagerButton.addEventListener("click", () =>
  updateManager(mapPrintManager)
);

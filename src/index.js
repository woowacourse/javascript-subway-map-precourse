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

managerButtons.forEach(managerButton =>
  managerButton.addEventListener("click", handleManagerButton)
);

stationManagerButton.addEventListener("click", () => new StationManager());
lineManagerButton.addEventListener("click", () => new LineManager());
sectionManagerButton.addEventListener("click", () => new SectionManager());
mapPrintManagerButton.addEventListener("click", () => new MapPrintManager());

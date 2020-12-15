import stationContainer from "./station/stationContainer";
import lineContainer from "./line/lineContainer";
import sectionContainer from "./section/sectionContainer";
import printMapContainer from "./printMap/printMapContainer";

const init = () => {
  const stationButton = document.querySelector("#station-manager-button");
  const lineButton = document.querySelector("#line-manager-button");
  const sectionButton = document.querySelector("#section-manager-button");
  const printMapButton = document.querySelector("#map-print-manager-button");

  stationButton.addEventListener("click", () => {
    clearScreen();
    stationContainer();
  });

  lineButton.addEventListener("click", () => {
    clearScreen();
    lineContainer();
  });

  sectionButton.addEventListener("click", () => {
    clearScreen();
    sectionContainer();
  });
  printMapButton.addEventListener("click", () => {
    clearScreen();
    printMapContainer();
  });

  const clearScreen = () => {
    const stationManageContainer = document.querySelector(
      "#station-manager-container",
    );
    const lineManageContainer = document.querySelector(
      "#line-manager-container",
    );
    const sectionManageContainer = document.querySelector(
      "#section-manager-container",
    );
    const printMapManageContainer = document.querySelector(
      "#map-print-manager-container",
    );

    stationManageContainer.style.display = "none";
    lineManageContainer.style.display = "none";
    sectionManageContainer.style.display = "none";
    printMapManageContainer.style.display = "none";
  };
};

init();

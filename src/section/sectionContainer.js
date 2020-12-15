import {
  lineMenuPresenter,
  sectionManagePresenter,
  lineListTemplate,
} from "./sectionPresenter";

export default function sectionContainer() {
  let lineData = [];
  let stationData = [];

  const addSection = (station, order, line) => {
    const sectionManageContainer = document.querySelector(
      "#section-manage-container",
    );
    const lineListTable = document.querySelector("#line-list-table");
    const prevLineDataIndex = lineData.indexOf(line);

    line.splice(parseInt(order) + 1, 0, station);
    lineData[prevLineDataIndex] = line;
    sectionManageContainer.removeChild(lineListTable);

    setLocalData(lineData);
    lineListTemplate(line);
    sectionHandler(line);
  };

  const getLocalData = () => {
    stationData = JSON.parse(window.localStorage.getItem("stationList"));
    lineData = JSON.parse(window.localStorage.getItem("lineList"));
  };

  const setLocalData = lineData => {
    window.localStorage.setItem("lineList", JSON.stringify(lineData));
  };

  const sectionHandler = line => {
    const sectionSelector = document.querySelector("#section-manage-selector");
    const sectionInputNumber = document.querySelector("#section-manage-input");
    const sectionButton = document.querySelector("#section-manage-button");
    sectionButton.addEventListener("click", () => {
      addSection(
        sectionSelector.options[sectionSelector.selectedIndex].value,
        sectionInputNumber.value,
        line,
      );
    });
  };

  const MenuButtonHandler = () => {
    const menuButtons = document.querySelectorAll("#line-menu-button");
    if (menuButtons !== null) {
      for (const menuButton of menuButtons) {
        menuButton.addEventListener("click", event => {
          manageLine(event);
        });
      }
    }
  };

  const manageLine = event => {
    const targetLine = event.target.dataset.linenumber;
    for (const line of lineData) {
      if (line[0] === targetLine) {
        sectionManagePresenter(line, stationData);
        lineListTemplate(line);
        sectionHandler(line);
      }
    }
  };

  const init = () => {
    const sectionContainer = document.querySelector(
      "#section-manager-container",
    );
    getLocalData();
    lineMenuPresenter(lineData);
    MenuButtonHandler();
    sectionContainer.style.display = "block";
  };

  init();
}

import {
  lineMenuPresenter,
  sectionManagePresenter,
  lineListTemplate,
} from "./sectionPresenter";

export default function sectionContainer() {
  let lineData = [];
  let stationData = [];

  const getLocalData = () => {
    stationData = JSON.parse(window.localStorage.getItem("stationList"));
    lineData = JSON.parse(window.localStorage.getItem("lineList"));
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

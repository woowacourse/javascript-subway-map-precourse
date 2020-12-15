import { lineMenuPresenter } from "./sectionPresenter";

export default function sectionContainer() {
  let lineData = [];
  let stationData = [];

  const getLocalData = () => {
    stationData = JSON.parse(window.localStorage.getItem("stationList"));
    lineData = JSON.parse(window.localStorage.getItem("lineList"));
  };

  const init = () => {
    const sectionContainer = document.querySelector(
      "#section-manager-container",
    );
    getLocalData();
    lineMenuPresenter(lineData);
    sectionContainer.style.display = "block";
  };

  init();
}

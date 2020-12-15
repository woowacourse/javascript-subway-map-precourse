import { listHeaderPresenter } from "./printMapPresenter";

export default function printMapContainer() {
  let lineData = [];

  const getLocalData = () => {
    lineData = JSON.parse(window.localStorage.getItem("lineList"));
  };

  const init = () => {
    const printMapContainer = document.querySelector(
      "#map-print-manager-container",
    );
    getLocalData();
    listHeaderPresenter(lineData);
    printMapContainer.style.display = "block";
  };

  init();
}

import { buttonIdArray } from "./consts/consts.js";
import { handlerArray } from "./utils/handler.js";

export const appContainer = document.getElementById("app");
appContainer.setAttribute("data-station", "");
appContainer.setAttribute("data-line", "");

export let stationArray = [];
export let lineData = {};

const App = () => {
  getLocalStorage();
  bindHandler();
};

const bindHandler = () => {
  for (let i = 0; i < buttonIdArray.length; i++) {
    document
      .getElementById(buttonIdArray[i])
      .addEventListener("click", handlerArray[i]);
  }
};

const getLocalStorage = () => {
  const localStorage = window.localStorage;

  if (localStorage.station) {
    stationArray = localStorage.station.split(",");
    appContainer.dataset.station = localStorage.station;
  }

  if (localStorage.line) {
    lineData = JSON.parse(localStorage.line);
    appContainer.dataset.line = localStorage.line;
  }
};

App();

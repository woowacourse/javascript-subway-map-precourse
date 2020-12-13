import { buttonIdArray } from "./consts/consts.js";
import { handlerArray } from "./utils/handler.js";

export let stationArray = [];
export let lineData = {};

const App = () => {
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
  }

  if (localStorage.line) {
    lineData = JSON.parse(localStorage.line);
  }
};

App();

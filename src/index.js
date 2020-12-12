import { buttonIdArray } from "./consts/consts.js";
import { handlerArray } from "./utils/handler.js";

export const stationArray = [];

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

App();

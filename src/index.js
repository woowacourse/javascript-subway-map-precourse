import { buttonIdArray } from "./consts/consts";
import { handlerArray } from "./utils/handler";

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

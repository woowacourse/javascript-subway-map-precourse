import { stationStart } from "./stationContainer.js";
import { displayInitialStation } from "./stationPresenter.js";

const stationManager = () => {
  const isDisplayed = displayInitialStation();

  if (isDisplayed) {
    stationStart();
  }
};

export default stationManager;

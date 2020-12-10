import { stationStart } from "./stationContainer.js";
import { displayStationUtil } from "./stationPresenter.js";

const stationManager = () => {
  const isDisplayed = displayStationUtil();

  if (isDisplayed) {
    stationStart();
  }
};

export default stationManager;

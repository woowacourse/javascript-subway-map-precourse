import StationNameInputValidation from "../../controllers/station/stationNameInputValidation.js";
import { STATION_NAME_INPUT } from "../../common/IdAndClassNames.js";
import saveNewStation from "../../_store/Station/saveNewStation.js";

export default (stationName) => {
  const $inputForm = document.querySelector(STATION_NAME_INPUT);
  const checkInput = new StationNameInputValidation(stationName);
  const { ok, message } = checkInput.getInputResult();

  return new Promise((resolve, reject) => {
    $inputForm.value = "";
    if (ok) {
      resolve(saveNewStation(stationName));
    } else {
      $inputForm.focus();
      reject(alert(message));
    }
  });
};

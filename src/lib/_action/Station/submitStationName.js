import StationNameInputValidation from "../../controllers/station/stationNameInputValidation.js";
import { STATION_NAME_INPUT, STATION_LIST } from "../../common/IdAndClassNames.js";
import saveNewStation from "../../_store/Station/saveNewStation.js";

export default (inputValue) => {
  const $inputForm = document.querySelector(STATION_NAME_INPUT);
  const checkInput = new StationNameInputValidation(inputValue);

  return new Promise((resolve, reject) => {
    $inputForm.value = "";
    if (checkInput.getInputResult().ok) {
      resolve(saveNewStation(inputValue));
    } else {
      $inputForm.focus();
      reject(alert(checkInput.getInputResult().message));
    }
  });
};

import StationNameInputValidation from "../../controllers/station/stationNameInputValidation.js";
import saveNewStation from "../../_store/Station/saveNewStation.js";

export default (inputValue) => {
  const checkInput = new StationNameInputValidation(inputValue);
  console.log(checkInput);
  return new Promise((resolve, reject) => {
    if (checkInput.getInputResult().ok) {
      resolve(saveNewStation(inputValue));
    } else {
      reject(alert(checkInput.getInputResult().message));
    }
  });
};

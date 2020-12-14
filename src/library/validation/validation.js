import { stationNameAlert } from "./alert.js";

function validStationName(inputValue) {
  let alertMsg = stationNameAlert(inputValue);

  if (alertMsg !== "") {
    alert(alertMsg);
    document.getElementById("station-add-input").focus();
    return "";
  }
  return inputValue;
}

export { validStationName };

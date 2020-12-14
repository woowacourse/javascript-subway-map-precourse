import { stationNameAlert, stationDeleteAlert } from "./alert.js";

function validStationName(inputValue) {
  let alertMsg = stationNameAlert(inputValue);

  if (alertMsg !== "") {
    alert(alertMsg);
    document.getElementById("station-add-input").focus();
    return "";
  }
  return inputValue;
}

function validStationDelete(deleteTarget) {
  let alertMsg = stationDeleteAlert(deleteTarget);

  if (alertMsg !== "") {
    alert(alertMsg);
    return "";
  }
  return deleteTarget;
}

export { validStationName, validStationDelete };

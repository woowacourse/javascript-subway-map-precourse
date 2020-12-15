import { stationNameAlert, stationDeleteAlert, lineNameAlert, startAndEndStationAlert, sectionDeleteAlert, orderAlert, sectionAlert } from "./alert.js";
import { STATION_NAME_INPUT } from "../../constants/tag.js";

function validateInput(input, inputTagID) {
  let alertMsg = "";

  inputTagID === STATION_NAME_INPUT ? (alertMsg = stationNameAlert(input)) : (alertMsg = lineNameAlert(input));

  if (alertMsg) {
    alert(alertMsg);
    document.getElementById(inputTagID).focus();

    return "";
  }

  return input;
}

function validateStationDelete(deleteTarget) {
  let alertMsg = stationDeleteAlert(deleteTarget);

  if (alertMsg !== "") {
    alert(alertMsg);

    return "";
  }
  return deleteTarget;
}

function validateSectionDelete() {
  let alertMsg = sectionDeleteAlert();

  if (alertMsg !== "") {
    alert(alertMsg);

    return "";
  }

  return confirm("정말로 노선에서 제거하겠습니까?");
}

function validateStartAndEndStations(startAndEndStations) {
  let alertMsg = startAndEndStationAlert(startAndEndStations);

  if (alertMsg !== "") {
    alert(alertMsg);

    return "";
  }

  return startAndEndStations;
}

function validateOrder(order) {
  let alertMsg = orderAlert(order);

  if (alertMsg !== "") {
    alert(alertMsg);

    return "";
  }

  return order;
}

function validateSection(stationName) {
  let alertMsg = sectionAlert(stationName);

  if (alertMsg !== "") {
    alert(alertMsg);

    return "";
  }

  return stationName;
}

export { validateInput, validateStationDelete, validateStartAndEndStations, validateSectionDelete, validateOrder, validateSection };

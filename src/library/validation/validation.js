import { stationNameAlert, stationDeleteAlert, lineNameAlert, startAndEndStationAlert, sectionDeleteAlert, orderAlert } from "./alert.js";

function validateInput(input, inputTagID) {
  let alertMsg = "";
  inputTagID === "station-add-input" ? (alertMsg = stationNameAlert(input)) : (alertMsg = lineNameAlert(input));
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

function validateSectionDelete(targetLine) {
  let alertMsg = sectionDeleteAlert(targetLine);
  //노선에 포함된 역이 2개 이하일 때 노선에서 제거 시 alert

  if (alertMsg !== "") {
    alert(alertMsg);
    return "";
  }
  return confirmSectionDelete();
}

function confirmSectionDelete() {
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

export { validateInput, validateStationDelete, validateStartAndEndStations, validateSectionDelete, validateOrder };

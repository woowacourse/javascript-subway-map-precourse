import { stationNameAlert, stationDeleteAlert, lineNameAlert, startAndEndStationAlert } from "./alert.js";

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

// function validName(inputValue) {
//   let alertMsg = stationNameAlert(inputValue);
//   if (alertMsg !== "") {
//     alert(alertMsg);
//     document.getElementById("station-add-input").focus();
//     return "";
//   }
//   return inputValue;
// }

// function validLineName(inputValue) {
//   let alertMsg = lineNameAlert(inputValue);

//   if (alertMsg !== "") {
//     alert(alertMsg);
//     document.getElementById("line-name-input").focus();
//     return "";
//   }
//   console.log(inputValue);
//   return inputValue;
// }

function validateStationDelete(deleteTarget) {
  let alertMsg = stationDeleteAlert(deleteTarget);

  if (alertMsg !== "") {
    alert(alertMsg);
    return "";
  }
  return deleteTarget;
}

function confirmSectionDelete() {
  let answer = confirm("정말로 노선에서 제거하겠습니까?");
  return answer;
}

function validateStartAndEndStations(startAndEndStations) {
  let alertMsg = startAndEndStationAlert(startAndEndStations);

  if (alertMsg !== "") {
    alert(alertMsg);
    return "";
  }
  return startAndEndStations;
}

export { validateInput, validateStationDelete, confirmSectionDelete, validateStartAndEndStations };

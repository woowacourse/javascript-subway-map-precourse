import { stationNameAlert, stationDeleteAlert, lineNameAlert } from "./alert.js";

//만약 부른 곳이 station이면 station
//부른 곳이 line이라면 line에 맞추어 변경?
function validName(inputValue) {
  let alertMsg = stationNameAlert(inputValue);

  if (alertMsg !== "") {
    alert(alertMsg);
    document.getElementById("station-add-input").focus();
    return "";
  }
  return inputValue;
}

function validLineName(inputValue) {
  let alertMsg = lineNameAlert(inputValue);

  if (alertMsg !== "") {
    alert(alertMsg);
    document.getElementById("line-name-input").focus();
    return "";
  }
  console.log(inputValue);
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

function confirmSectionDelete() {
  let answer = confirm("정말로 노선에서 제거하겠습니까?");
  return answer;
}

export { validName, validStationDelete, validLineName, confirmSectionDelete };

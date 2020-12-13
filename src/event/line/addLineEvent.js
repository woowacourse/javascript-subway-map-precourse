import renderLine from "../../render/renderLine.js";
import {
  isSatisfyLength,
  isSameDestination,
  isLineAlreadyExist,
  isTransferStation,
} from "../../inputCheck.js";
import { alertMessage } from "../../alertMessage.js";

function addLine(line, start, end) {
  let lines = JSON.parse(localStorage.lines);
  let newLine = { name: String(line), sections: [start, end] };
  lines.push(newLine);
  localStorage.lines = JSON.stringify(lines);
  renderLine();
}

function checkValidLine() {
  const line = document.getElementById("line-name-input").value;
  const start = document.getElementById("line-start-station-selector").value;
  const end = document.getElementById("line-end-station-selector").value;
  const lines = JSON.parse(localStorage.lines);
  if (!isSatisfyLength(line)) {
    return alert(alertMessage.SHORT_LENGTH_ERROR);
  } else if (isSameDestination(start, end)) {
    return alert(alertMessage.SAME_DESTINATION_ERROR);
  } else if (isLineAlreadyExist(lines, line)) {
    return alert(alertMessage.SAME_LINE_EXIST_ERROR);
  } else if (isTransferStation(lines, start)) {
    return alert(`${start}` + alertMessage.TRANSFER_STATION_MESSAGE);
  } else if (isTransferStation(lines, end)) {
    return alert(`${end}` + alertMessage.TRANSFER_STATION_MESSAGE);
  }
  addLine(line, start, end);
}

export default function addLineEvent() {
  const $addLineBtn = document.getElementById("line-add-button");
  $addLineBtn.addEventListener("click", checkValidLine);
}

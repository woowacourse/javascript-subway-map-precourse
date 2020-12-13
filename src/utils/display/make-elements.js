import { state, saveToLocalStorage } from "../../index.js";
import { LINE_ARRAY_KEY, STATION_ARRAY_KEY } from "../../global/constant.js";
import { CONFIRM_MESSAGES } from "../../global/messages.js";

export function makeTdElement(elementToMake) {
  const tdContent = document.createElement("td");

  tdContent.append(elementToMake);

  return tdContent;
}

export function makeTdDeleteBtn(objectToMake, tr) {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("button");
  const CONFIRM_DELETE = CONFIRM_MESSAGES.CONFIRM_DELETE;

  deleteBtn.innerHTML = "삭제";
  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm(CONFIRM_DELETE);

    if (confirmDelete) {
      deleteObject(objectToMake, tr);
    }
  });
  tdDeleteBtn.appendChild(deleteBtn);

  return tdDeleteBtn;
}

function deleteObject(object, tr) {
  if (object.type === "STATION") {
    const deleteStation = state.stationArray.filter((station) => {
      return station.id !== object.id;
    });
    tr.remove();
    state.stationArray = deleteStation;
    saveToLocalStorage(STATION_ARRAY_KEY, JSON.stringify(state.stationArray));
  } else if (object.type === "LINE") {
    const deleteLine = state.subwayLines.filter((line) => {
      return line.id !== object.id;
    });
    tr.remove();
    state.subwayLines = deleteLine;
    saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
  }
}

export default function makeOneRowWithDeleteBtn(objectToMake, [...args]) {
  const tr = document.createElement("tr");
  const deleteBtn = makeTdDeleteBtn(objectToMake, tr);

  for (const arg of [...args]) {
    tr.appendChild(makeTdElement(arg));
    tr.id = objectToMake.id;
  }
  tr.appendChild(deleteBtn);

  return tr;
}

export function makeSelectOptions(selectBox, optionToMakeArray) {
  for (const optionValue of optionToMakeArray) {
    const option = document.createElement("option");
    option.value = optionValue.stationName;
    option.text = optionValue.stationName;
    selectBox.appendChild(option);
  }
}

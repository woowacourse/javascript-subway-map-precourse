import { state, saveToLocalStorage } from "../../index.js";
import { LINE_ARRAY_KEY, STATION_ARRAY_KEY } from "../../global/constant.js";
import {
  CONFIRM_MESSAGES,
  LINE_ALERT_MESSAGES,
} from "../../global/messages.js";

function confirmDelete(array, station, tr) {
  const confirmDelete = confirm(CONFIRM_MESSAGES.CONFIRM_DELETE);

  if (confirmDelete) {
    deleteObject(array, station, tr);
  }
}

function deleteObject(object, stationToDelete, tr) {
  const deleteStation = object.filter(
    (station) => station.id !== stationToDelete.id
  );
  tr.remove();
  if (stationToDelete.type === "LINE") {
    state.subwayLines = deleteStation;
    saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(deleteStation));
  } else if (stationToDelete.type === "STATION") {
    state.stationArray = deleteStation;
    saveToLocalStorage(STATION_ARRAY_KEY, JSON.stringify(deleteStation));
  }
}

function isContainedInLine(station) {
  const isContained = state.subwayLines.filter((line) => {
    let contain = false;
    line.stations.filter((stations) => {
      if (stations.stationName === station.stationName) {
        contain = true;
      }
    });
    return contain;
  });

  return isContained.length;
}

function alertContainedStationInLine(station, tr) {
  if (isContainedInLine(station) === 0) {
    confirmDelete(state.stationArray, station, tr);
  } else {
    return alert(LINE_ALERT_MESSAGES.ERROR_CANNOT_DELETE_STATION_IN_LINE);
  }
}

function makeTdDeleteButton(station, tr) {
  const td = document.createElement("td");
  const deleteButtonHtml = `<button>삭제</button>`;
  const deleteButton = new DOMParser().parseFromString(
    deleteButtonHtml,
    "text/html"
  ).childNodes[0].lastElementChild.firstElementChild;

  deleteButton.addEventListener("click", () => {
    if (station.type === "LINE") {
      confirmDelete(state.subwayLines, station, tr);
    } else if (station.type === "STATION") {
      alertContainedStationInLine(station, tr);
    }
  });
  td.appendChild(deleteButton);

  return td;
}

function makeOneRowWithDeleteButton(object, [...args]) {
  const tr = document.createElement("tr");
  const deleteButton = makeTdDeleteButton(object, tr);

  for (const arg of [...args]) {
    tr.appendChild(makeNewTdWithElement(arg));
    tr.id = object.id;
  }
  tr.appendChild(deleteButton);

  return tr;
}

export function showNewRow(parentID, rowToShow, [...args]) {
  const oneRowWithDeleteButton = makeOneRowWithDeleteButton(rowToShow, [
    ...args,
  ]);
  const locationOfRow = document.getElementById(parentID);

  return locationOfRow.appendChild(oneRowWithDeleteButton);
}

export function makeSelectOptions(selectBox, optionToMakeArray) {
  for (const optionValue of optionToMakeArray) {
    const option = document.createElement("option");

    option.value = optionValue.stationName;
    option.text = optionValue.stationName;
    selectBox.appendChild(option);
  }
}

export function makeNewElementWithInnerHtml(elementType, innerHTML) {
  const element = document.createElement(elementType);
  element.innerHTML = innerHTML;

  return element;
}

export function makeNewTdWithElement(element) {
  const td = document.createElement("td");
  td.append(element);

  return td;
}

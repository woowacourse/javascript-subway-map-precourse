import { state, saveToLocalStorage } from "../../index.js";
import { STATION_ARRAY_KEY } from "../../global/constant.js";

export function makeTdElement(elementToMake) {
  const tdContent = document.createElement("td");

  tdContent.append(elementToMake);

  return tdContent;
}

export function makeTdDeleteBtn(objectToMake, tr) {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "삭제";
  deleteBtn.addEventListener("click", () => {
    const deleteStation = state.stationArray.filter((station) => {
      return station.id !== objectToMake.id;
    });
    tr.remove();
    state.stationArray = deleteStation;
    saveToLocalStorage(STATION_ARRAY_KEY, JSON.stringify(state.stationArray));
  });
  tdDeleteBtn.appendChild(deleteBtn);

  return tdDeleteBtn;
}

export default function makeOneRowWithDeleteBtn(objectToMake, ...args) {
  const tr = document.createElement("tr");
  const deleteBtn = makeTdDeleteBtn(objectToMake, tr);

  tr.appendChild(makeTdElement(objectToMake.stationName));
  tr.id = objectToMake.id;
  tr.appendChild(deleteBtn);

  return tr;
}

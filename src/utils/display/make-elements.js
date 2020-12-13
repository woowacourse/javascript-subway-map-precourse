import { STATION_ARRAY_KEY } from "../../global/constant.js";

export function makeTdElement(elementToMake) {
  const tdContent = document.createElement("td");

  tdContent.append(elementToMake);

  return tdContent;
}

export function makeTdDeleteBtn() {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "삭제";
  tdDeleteBtn.appendChild(deleteBtn);

  return tdDeleteBtn;
}

export default function makeOneRowWithDeleteBtn(objectToMake) {
  const tr = document.createElement("tr");
  const deleteBtn = makeTdDeleteBtn();

  tr.appendChild(makeTdElement(objectToMake.stationName));
  tr.appendChild(deleteBtn);

  return tr;
}

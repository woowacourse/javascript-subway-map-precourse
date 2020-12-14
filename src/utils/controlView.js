import { STATION_DIV } from "../constant.js";
import { removeStationHandler } from "./station.js";

export const cleanView = () => {
  const { children } = document.getElementById("app");
  for (let i = STATION_DIV; i < children.length; i += 1) {
    children[i].style.display = "none";
  }
};

export const cleanPreView = (num) => {
  const { children } = document.getElementById("app");
  for (let i = STATION_DIV; i < children.length; i += 1) {
    if (i !== num) children[i].style.display = "none";
  }
};
export const controlDisplay = (child) => {
  child.style.display === "none"
    ? (child.style.display = "")
    : (child.style.display = "none");
};

export function tableButton(buttonNodes) {
  Array.prototype.forEach.call(
    buttonNodes,
    function (button) {
      button.addEventListener("click", removeStationHandler.bind(this));
    }.bind(this)
  );
}

export function makeTableStation(table) {
  table.innerHTML += `<thead>
    <th>역 이름 </th> <th>설정</th>
  </thead>`;
  this.station.map((v) => {
    const row = `<tr data-id=${v.id}>
    <td>${v.name}</td>
    <td> <button class="station-delete-button">삭제</button></td>
  </tr>`;
    table.innerHTML += row;
  });
  tableButton.call(this, document.querySelectorAll(".station-delete-button"));
}

export function printStation() {
  let table;
  if (!document.querySelector("table")) {
    table = document.createElement("table");
    document.getElementById("app").children[STATION_DIV].append(table);
  }
  table = document.querySelector("table");
  table.innerHTML = "";
  makeTableStation.call(this, table);
}

export function clearSelect(lineSelect) {
  while (lineSelect.hasChildNodes()) {
    lineSelect.removeChild(lineSelect.firstChild);
  }
}
export function setDataSelect(name) {
  const lineSelect = document.getElementById(name);
  clearSelect(lineSelect);
  this.station.forEach((v) => {
    let option = document.createElement("option");
    option.dataset.id = v.id;
    option.innerText = v.name;
    lineSelect.append(option);
  });
}

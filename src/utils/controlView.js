import { STATION_DIV, SELECTION_ADD_DIV_CHILD_COUNT } from "../constant.js";
import { getButtonFunction, getDivName } from "./data.js";
import { lineControlEventHandler, sectionAddButton } from "./section.js";
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
  let buttonFunction = getButtonFunction(buttonNodes);
  Array.prototype.forEach.call(
    buttonNodes,
    function (button) {
      button.addEventListener("click", buttonFunction.bind(this));
    }.bind(this)
  );
}

export function sectionLineButton(buttonNodes) {
  Array.prototype.forEach.call(
    buttonNodes,
    function (button) {
      button.addEventListener("click", lineControlEventHandler.bind(this));
    }.bind(this)
  );
}

export function makeTableStation(table) {
  table.innerHTML += `<thead>
    <th> 역 이름 </th> <th> 설정 </th>
  </thead>`;
  this.station.map((v) => {
    const row = `<tr data-id=${v.id} data-value=${v.name}>
    <td>${v.name}</td> <td><button class="station-delete-button">삭제</button></td>
  </tr>`;
    table.innerHTML += row;
  });
  tableButton.call(this, document.querySelectorAll(".station-delete-button"));
}

export function makeTableLine(table) {
  table.innerHTML += `<thead>
    <th> 노선 이름 </th> <th> 상행 종점역 </th> <th>하행 종점역 </th> <th> 설정 </th>
  </thead>`;
  this.line.map((v) => {
    const row = `<tr data-id=${v.id}>
    <td>${v.name}</td> <td>${v.stations[0].station}</td> 
    <td>${v.stations[v.stations.length - 1].station}</td>
    <td> <button class="line-delete-button"> 삭제 </button></td>
  </tr>`;
    table.innerHTML += row;
  });
  tableButton.call(this, document.querySelectorAll(".line-delete-button"));
}

export function printTable(NAME_DIV) {
  let table;
  const parent = document.getElementById("app").children[NAME_DIV];
  if (!parent.getElementsByTagName("table").length) {
    table = document.createElement("table");
    parent.append(table);
  }
  table = parent.getElementsByTagName("table")[0];
  table.innerHTML = "";
  getDivName.call(this, NAME_DIV, table); //NAME_DIV에 따라 함수 호출 구분
}

export function printSectionLineButton(parent) {
  let div;
  if (!parent.getElementsByTagName("div").length) {
    div = document.createElement("div");
    parent.append(div);
  }
  div = parent.getElementsByTagName("div")[0];
  div.innerHTML = "";
  this.line.map((v) => {
    div.innerHTML += `<button class="section-line-menu-button" data-value =${v.name}> ${v.name}</button>`;
  });
  sectionLineButton.call(
    this,
    document.querySelectorAll(".section-line-menu-button")
  );
}

export function printSectionAddDiv(parent, buttonName) {
  let div;
  if (parent.children.length !== SELECTION_ADD_DIV_CHILD_COUNT) {
    div = document.createElement("div");
    parent.append(div);
  }
  div = parent.children[1];
  div.innerHTML = `<h3>${buttonName} 관리 </h3> <h4> 구간 등록 </h4> 
  <select id="section-station-selector"/> <input id="section-order-input" placeholder="순서" /> 
  <button id="section-add-button"> 등록 </button>
   `;
  setDataSelect.call(this, "section-station-selector");
  sectionAddButton.call(this); //이벤트 등록 함수
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
    option.dataset.value = v.name;
    option.innerText = v.name;
    lineSelect.append(option);
  });
}

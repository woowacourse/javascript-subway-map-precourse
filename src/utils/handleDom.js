import { DELETE_GUIDE } from "../constants/constants.js";
export const displayShow = (dom) => {
  dom.style.display = "block";
};

export const displayhide = (dom) => {
  dom.style.display = "none";
};

export const showErrors = (error) => {
  alert(error);
};

export const addRowInStationTable = (table, name, field) => {
  const tr = document.createElement("tr");

  addCell(tr, name);
  addCell(tr, addDeleteButton(name, `${DELETE_GUIDE.DELETE}`, field));
  table.appendChild(tr);
};

export const addRowInListTable = (table, name, start, end, field) => {
  const tr = document.createElement("tr");

  addCell(tr, name);
  addCell(tr, end);
  addCell(tr, start);
  addCell(tr, addDeleteButton(name, `${DELETE_GUIDE.DELETE}`, field));
  table.appendChild(tr);
};

const addCell = (tr, value) => {
  const td = document.createElement("td");

  td.innerHTML = value;
  tr.appendChild(td);
};

const addDeleteButton = (name, buttonName, field) => {
  return `<button class="delete-button" data-${field}="${name}">${buttonName}</button>`;
};

export const addOptionTag = (selector, station) => {
  const option = document.createElement("option");

  option.value = station;
  option.innerHTML = station;
  selector.appendChild(option);
};

export const initSelector = (selector) => {
  selector.innerHTML = "";
};

export const addLineNameHeader = (lineName) => {
  const header = document.createElement("h3");

  header.innerHTML = `${lineName} 관리`;
  return header;
};

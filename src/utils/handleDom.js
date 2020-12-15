import { DELETE_GUIDE } from "../constants/constants.js";

export const displayShow = (dom) => {
  dom.style.display = "block";
};

export const displayHide = (dom) => {
  dom.style.display = "none";
};

export const display = (isShow, dom) => {
  if (isShow) {
    displayShow(dom);
  } else {
    displayHide(dom);
  }
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

export const addRowInSectionTable = (table, order, station, field) => {
  const tr = document.createElement("tr");

  addCell(tr, order);
  addCell(tr, station);
  addCell(tr, addDeleteButton(order, `${DELETE_GUIDE.DELETE_IN_LINE}`, field));
  table.appendChild(tr);
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

const addCell = (tr, value) => {
  const td = document.createElement("td");

  td.innerHTML = value;
  tr.appendChild(td);
};

const addDeleteButton = (value, buttonName, field) => {
  return `<button class="delete-button" data-${field}="${value}">${buttonName}</button>`;
};

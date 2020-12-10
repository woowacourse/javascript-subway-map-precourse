import { WORDS } from "../constants/index.js";

export const createDiv = (text, style = "") => {
  const div = document.createElement("div");

  div.innerText = text;
  div.style = style;

  return div;
};

export const createInput = (idValue = "", placeholder = "", type = "text") => {
  const input = document.createElement("input");

  input.setAttribute("id", idValue);
  input.type = type;
  input.placeholder = placeholder;

  return input;
};

export const createButton = (idValue = "", classValue = "", text) => {
  const button = document.createElement("button");

  button.setAttribute("id", idValue);
  button.setAttribute("class", classValue);
  button.innerText = text;

  return button;
};

export const createHeader = (number, text) => {
  const header = document.createElement(`h${number}`);

  header.innerText = text;

  return header;
};

export const createTable = (colTitleArray) => {
  const table = document.createElement("table");
  const tr = document.createElement("tr");

  colTitleArray.forEach((title) => {
    const th = document.createElement("th");

    th.style = "border: 1px solid black";
    th.innerText = title;
    tr.appendChild(th);
  });
  table.style = "border: 1px solid black";

  table.appendChild(tr);

  return table;
};

export const createStationTableRow = (stationName) => {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const button = createButton(
    "",
    "station-delete-button",
    WORDS.STATION.DELETE_BUTTON
  );

  td1.innerText = stationName;
  td1.style = "border: 1px solid black";
  td2.style = "border: 1px solid black";

  td2.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);

  return tr;
};

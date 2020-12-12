import { WORDS } from "../constants/index.js";

export const createDiv = (text, style = "") => {
  const div = document.createElement("div");

  div.innerText = text;
  div.style = style;

  return div;
};

export const createDivContainer = (elementArray, style = "", id = "") => {
  const container = document.createElement("div");

  elementArray.forEach((element) => {
    container.appendChild(element);
  });

  container.setAttribute("id", id);
  container.style = style;

  return container;
};

export const createInput = (idValue = "", placeholder = "", type = "text") => {
  const input = document.createElement("input");

  input.setAttribute("id", idValue);
  input.type = type;
  input.placeholder = placeholder;

  return input;
};

export const createButton = (
  idValue = "",
  classValue = "",
  text,
  style = ""
) => {
  const button = document.createElement("button");

  button.setAttribute("id", idValue);
  button.setAttribute("class", classValue);
  button.innerText = text;
  button.style = style;

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

export const createLabel = (forValue, text) => {
  const label = document.createElement("label");

  label.setAttribute("for", forValue);
  label.innerText = text;

  return label;
};

export const createSelect = (selectId, optionArray) => {
  const select = document.createElement("select");

  select.setAttribute("id", selectId);

  optionArray.forEach((option) => {
    const optionE = document.createElement("option");

    optionE.setAttribute("value", option);
    optionE.innerText = option;

    select.appendChild(optionE);
  });

  return select;
};

const createTd = (text = "") => {
  const td = document.createElement("td");

  td.innerText = text;
  td.style = "border: 1px solid black";

  return td;
};

export const createStationTableRow = (stationName) => {
  const tr = document.createElement("tr");
  const td1 = createTd(stationName);
  const td2 = createTd();
  const button = createButton(
    "",
    "station-delete-button",
    WORDS.STATION.DELETE_BUTTON
  );

  td2.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);

  return tr;
};

export const createLineTableRow = (lineInfo) => {
  const lineName = Object.keys(lineInfo)[0];
  const stations = Object.values(lineInfo)[0];
  const tr = document.createElement("tr");
  const td1 = createTd(lineName);
  const td2 = createTd(stations[0]);
  const td3 = createTd(stations[stations.length - 1]);
  const td4 = createTd();
  const button = createButton(
    "",
    "line-delete-button",
    WORDS.LINE.DELETE_BUTTON
  );
  const tdArray = [td1, td2, td3, td4];

  td4.appendChild(button);
  tdArray.forEach((td) => tr.appendChild(td));

  return tr;
};

export const createSectionTableRow = (sectionInfo, index) => {
  const tr = document.createElement("tr");
  const td1 = createTd(index);
  const td2 = createTd(sectionInfo);
  const td3 = createTd();
  const button = createButton(
    "",
    "section-delete-button",
    WORDS.SECTION.DELETE_BUTTON
  );
  const tdArray = [td1, td2, td3];

  td3.appendChild(button);
  tdArray.forEach((td) => tr.appendChild(td));

  return tr;
};

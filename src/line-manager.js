import { manager } from "./index.js";

export const deleteLineInList = (lineName) => {
  const parent = document.querySelector("table#line-list-table tbody");
  const deleteIdx = manager.lineList.findIndex((line) => {
    return line.name === lineName;
  });
  parent.removeChild(
    document.querySelector(`table#line-list-table tbody tr#${lineName}`)
  );
  console.log(manager.lineList);
  manager.lineList.splice(deleteIdx, 1);
  console.log(manager.lineList);
};
export const makeChildInLine = (line) => {
  const lineName = document.createElement("td");
  const startStation = document.createElement("td");
  const endStation = document.createElement("td");
  const deleteButton = document.createElement("td");
  lineName.innerHTML = line.name;
  startStation.innerHTML = line.getStartStation();
  endStation.innerHTML = line.getEndStation();
  deleteButton.innerHTML = "삭제";
  deleteButton.setAttribute("class", "line-delete-button");
  deleteButton.onclick = () => {
    deleteLineInList(`${line.name}`);
  };
  deleteButton.innerHTML = "삭제";

  return [lineName, startStation, endStation, deleteButton];
};
export const makeLineBox = (line) => {
  const lineName = makeChildInLine(line)[0];
  const startStation = makeChildInLine(line)[1];
  const endStation = makeChildInLine(line)[2];
  const deleteButton = makeChildInLine(line)[3];
  const newLine = document.createElement("tr");
  newLine.setAttribute("id", `${line.name}`);
  newLine.appendChild(lineName);
  newLine.appendChild(startStation);
  newLine.appendChild(endStation);
  newLine.appendChild(deleteButton);

  return newLine;
};
export const addLineToList = (line) => {
  const newLine = makeLineBox(line);
  const table = document.getElementById("line-list-table");
  table.children[1].appendChild(newLine);
  document.getElementById("line-name-input").value = "";
};

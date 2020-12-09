export const addLineToList = (line) => {
  const newLine = document.createElement("tr");
  const lineName = document.createElement("td");
  const startStation = document.createElement("td");
  const endStation = document.createElement("td");
  const deleteButton = document.createElement("td");
  lineName.innerHTML = line.name;
  startStation.innerHTML = line.getStartStation();
  endStation.innerHTML = line.getEndStation();
  deleteButton.innerHTML = `<button class="line-delete-button">삭제</button>`;
  newLine.appendChild(lineName);
  newLine.appendChild(startStation);
  newLine.appendChild(endStation);
  newLine.appendChild(deleteButton);

  const table = document.getElementById("line-list-table");
  table.children[1].appendChild(newLine);
  document.getElementById("line-name-input").value = "";
};

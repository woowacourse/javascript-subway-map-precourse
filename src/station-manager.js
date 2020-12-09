export const addStationtoList = (stationList) => {
  const newRow = document.createElement("tr");
  const nameCol = document.createElement("td");
  const deleteCol = document.createElement("td");
  nameCol.innerHTML = stationList;
  deleteCol.innerHTML = '<button class="station-delete-class">삭제</button>';
  newRow.appendChild(nameCol);
  newRow.appendChild(deleteCol);

  const table = document.getElementById("staion-list-table");
  table.children[1].appendChild(newRow);
  document.getElementById("station-name-input").value = "";
};

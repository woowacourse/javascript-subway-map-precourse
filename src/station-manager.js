export const addStationtoList = (newStationName) => {
  const newStation = document.createElement("tr");
  const stationName = document.createElement("td");
  const deleteButton = document.createElement("td");
  stationName.innerHTML = newStationName;
  deleteButton.innerHTML = '<button class="station-delete-class">삭제</button>';
  newStation.appendChild(stationName);
  newStation.appendChild(deleteButton);

  const table = document.getElementById("staion-list-table");
  table.children[1].appendChild(newStation);
  document.getElementById("station-name-input").value = "";
};

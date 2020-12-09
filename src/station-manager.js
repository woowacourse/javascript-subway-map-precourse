export const isCorrectStationName = (newStationName) => {
  const rHangel = /^[가-힣]*$/;
  if (newStationName.length >= 2 && rHangel.exec(newStationName) !== null) {
    return true;
  }
  alert("지하철 역 이름을 두 글자 이상 입력하세요.");
  document.getElementById("station-name-input").value = "";

  return false;
};
export const addStationToList = (newStationName) => {
  const newStation = document.createElement("tr");
  const stationName = document.createElement("td");
  const deleteButton = document.createElement("td");
  stationName.innerHTML = newStationName;
  deleteButton.innerHTML = `<button class="station-delete-class" onclick="deleteStationInList(${newStationName})">삭제</button>`;
  newStation.appendChild(stationName);
  newStation.appendChild(deleteButton);

  const table = document.getElementById("staion-list-table");
  table.children[1].appendChild(newStation);
  document.getElementById("station-name-input").value = "";
};
export const deleteStationInList = (stationName) => {
  // const stationList
  console.log(stationName);
};

import { manager } from "./index.js";
import Station from "./station.js";

export const isCorrectStationName = (newStationName) => {
  const rHangel = /^[0-9A-Za-z가-힣]*$/;
  if (newStationName.length >= 2 && rHangel.exec(newStationName) !== null) {
    return true;
  }
  alert("지하철 역 이름을 두 글자 이상 입력하세요.");
  document.getElementById("station-name-input").value = "";

  return false;
};
export const isOverlappedStationName = (newStationName) => {
  const overlappedName = manager.stationList.find(
    (station) => station.name === newStationName
  );
  if (overlappedName) {
    alert("중복된 역 이름 입니다.");
    document.getElementById("station-name-input").value = "";

    return true;
  }
  return false;
};
export const isPossibleToDeleteStation = (stationName) => {
  const deleteStation = manager.stationList.find((station) => {
    return station.name === stationName;
  });
  if (deleteStation.isIncluded.length > 0) {
    alert("이미 노선에 등록되어 있는 역입니다.");
    return false; // 이미 노선에 등록되어있어서 삭제 불가
  }
  return true;
};
export const deleteStationInList = (stationName) => {
  const parent = document.querySelector("table#staion-list-table tbody");
  if (isPossibleToDeleteStation(stationName)) {
    const deleteIdx = manager.stationList.findIndex((station) => {
      return station.name === stationName;
    });
    parent.removeChild(
      document.querySelector(`table#staion-list-table tbody tr#${stationName}`)
    );
    manager.stationList.splice(deleteIdx, 1);
  }
};
export const makeStationBox = (newStationName) => {
  const newStation = document.createElement("tr");
  const stationName = document.createElement("td");
  const deleteButton = document.createElement("td");
  newStation.setAttribute("id", `${newStationName}`);
  stationName.innerHTML = newStationName;
  deleteButton.setAttribute("class", "station-delete-class");
  deleteButton.onclick = () => {
    deleteStationInList(`${newStationName}`);
  };
  deleteButton.innerHTML = "삭제";
  newStation.appendChild(stationName);
  newStation.appendChild(deleteButton);

  return newStation;
};
export const addStationToList = (newStationName) => {
  const station = new Station(newStationName);
  manager.addStationInList(station);
  const newStation = makeStationBox(newStationName);
  const table = document.getElementById("staion-list-table");
  table.children[1].appendChild(newStation);
  document.getElementById("station-name-input").value = "";
  console.log(manager.stationList);
};

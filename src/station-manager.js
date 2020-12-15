import { manager } from "./manager.js";
import Station from "./station.js";
import { makeStationList } from "./make-selector-list.js";

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
  if (manager.stationList.length > 0) {
    const overlappedName = manager.stationList.find(
      (station) => station.name === newStationName
    );
    if (overlappedName) {
      alert("중복된 역 이름 입니다.");
      document.getElementById("station-name-input").value = "";

      return true;
    }
    return false;
  }
};
export const isPossibleToDeleteStation = (stationIsIncluded) => {
  if (stationIsIncluded === "null") {
    return true;
  }
  alert("이미 노선에 등록되어 있는 역입니다.");

  return false;
};
export const deleteStationInList = (stationName, stationIsIncluded) => {
  const parent = document.querySelector("table#staion-list-table tbody");
  if (isPossibleToDeleteStation(stationIsIncluded)) {
    const deleteIdx = manager.stationList.findIndex((station) => {
      return station.name === stationName && station.isIncluded === null;
    });
    parent.removeChild(
      document.querySelector(
        `table#staion-list-table tbody tr#${stationName}-null`
      )
    );
    manager.stationList.splice(deleteIdx, 1);
    showAllStationInManager(makeStationList());
  }
};
export const makeStationBox = (newStationName, newStationIsIncluded) => {
  const newStation = document.createElement("tr");
  const stationName = document.createElement("td");
  const deleteButton = document.createElement("td");
  newStation.setAttribute("id", `${newStationName}-null`);
  stationName.innerHTML = newStationName;
  deleteButton.setAttribute("class", "station-delete-class");
  deleteButton.onclick = () => {
    deleteStationInList(`${newStationName}`, `${newStationIsIncluded}`);
  };
  deleteButton.innerHTML = "삭제";
  newStation.appendChild(stationName);
  newStation.appendChild(deleteButton);

  return newStation;
};
export const showAllStationInManager = (stationList) => {
  const table = document.getElementById("station-list");
  table.innerHTML = "";
  stationList.forEach((station) => {
    const newStation = makeStationBox(station.name, station.isIncluded);
    table.appendChild(newStation);
  });
};
export const addStationToList = (newStationName) => {
  const station = new Station(newStationName);
  manager.setStationInManager(station);
  const stationList = makeStationList(); // 중복 제거 된 지하철 역 리스트
  showAllStationInManager(stationList);
  document.getElementById("station-name-input").value = "";
};

const btnAddStation = document.getElementById("station-add-button");
btnAddStation.onclick = () => {
  const newStationName = document.getElementById("station-name-input").value;
  if (
    isCorrectStationName(newStationName) &&
    !isOverlappedStationName(newStationName)
  ) {
    addStationToList(newStationName);
  }
};

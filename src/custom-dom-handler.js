import StationManager from "./station-manager.js";

export const getChildById = (parentElement, id) => {
  const childrenList = parentElement.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

export const renderStationNameTable = () => {
  const tbody = document.getElementById("station-name-tbody");
  new StationManager().stationList.forEach((_station, _index) => {
    tbody.innerHTML += `
      <tr>
        <td>${_station}</td>
        <td><button data-station-index=${_index}>삭제</button></td>
      </tr>
    `;
  });
};

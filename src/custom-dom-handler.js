import StationManager from "./station-manager.js";
import { NO_DATA_MESSAGE_ID } from "./html-constants/no-data-message.js";

const fillStationNameTable = ($tbody) => {
  $tbody.innerHTML = "";
  new StationManager().stationList.forEach((_station, _index) => {
    $tbody.innerHTML += `
      <tr>
        <td>${_station}</td>
        <td><button data-station-index=${_index}>삭제</button></td>
      </tr>
    `;
  });
};

const turnOnNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "none";
  $noDataMessage.style.display = "block";
};

const turnOffNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "block";
  $noDataMessage.style.display = "none";
};

export const getChildById = (parent, id) => {
  const childrenList = parent.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

export const renderStationNameTable = () => {
  const $tbody = document.getElementById("station-name-tbody");
  const lenOfStationList = new StationManager().stationList.length;
  const $noStationMessage = getChildById(
    $tbody.parentElement,
    NO_DATA_MESSAGE_ID.noStation
  );
  if (lenOfStationList === 0) {
    turnOnNoDataMessage($tbody.parentElement, $noStationMessage);
  } else {
    if (lenOfStationList === 1) {
      turnOffNoDataMessage($tbody.parentElement, $noStationMessage);
    }
    fillStationNameTable($tbody);
  }
};

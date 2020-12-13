export const addClickEventFromId = (id, event) => {
  const element = document.getElementById(id);
  element.addEventListener("click", event);
};

export const resetStationTable = () => {
  const stationTable = document.getElementById("station-table");
  stationTable.innerHTML = `<tbody id="station-table-body"><tr><th>역 이름</th><th>설정</th></tr></tbody>`;
};

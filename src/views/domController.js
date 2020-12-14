import { stationMangeContainer } from "./dom.js";

export const clearMangeContainer = () => {
  const container = document.getElementById("subway-manager-container");
  container.innerHTML = "";
};

// station
export const rendStationMangeDom = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.innerHTML = stationMangeContainer();
  container.appendChild(div);
  //삭제 이벤트 등록
};

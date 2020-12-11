const managerContainer = document.getElementById("manager-container");
const stationTitle = "<p>역 관리</p>";

const init = () => {
  managerContainer.innerHTML = stationTitle;
};

export default function StationManager() {
  init();
}

const managerContainer = document.getElementById("manager-container");
const mapPrintTitle = "<p>지하철 노선도 출력</p>";

const init = () => {
  managerContainer.innerHTML = mapPrintTitle;
};

export default function MapPrintManager() {
  init();
}

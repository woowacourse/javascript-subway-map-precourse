const managerContainer = document.getElementById("manager-container");
const lineTitle = "<p>노선 관리</p>";

const init = () => {
  managerContainer.innerHTML = lineTitle;
};

export default function LineManager() {
  init();
}

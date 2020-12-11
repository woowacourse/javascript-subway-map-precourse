const managerContainer = document.getElementById("manager-container");
const sectionTitle = "<p>구간 관리</p>";

const init = () => {
  managerContainer.innerHTML = sectionTitle;
};

export default function SectionManager() {
  init();
}

const BUTTONS_ID = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];

const getChildById = (parentElement, id) => {
  const childrenList = parentElement.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

const renderStationAddForm = (container) => {
  container.innerHTML += `
    <label for="station-name-input">
      역 이름<br />
      <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요." />
    </label>
    <button id="station-add-button">역 추가</button>
  `;
};

const showStationManagerPage = (e) => {
  const $mainContentsContainer = getChildById(
    e.target.closest("#app"),
    "main-contents-container"
  );
  $mainContentsContainer.innerHTML = "";
  renderStationAddForm($mainContentsContainer);
};

export function menuButtonHandler(e) {
  if (e.target.id === BUTTONS_ID[0]) {
    showStationManagerPage(e);
  }
}

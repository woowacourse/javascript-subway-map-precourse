const STATION_NAME_INPUT_FORM = `
    <label>
      역 이름<br />
      <input type="text" id="station-name-input placeholder="역 이름을 입력해주세요" />
    </label>
    <button id="station-add-button">역 추가</button>
  `;

const getChildById = (parentElement, id) => {
  const childrenList = parentElement.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

const showStationManagerPage = (e) => {
  const $mainContentsContainer = getChildById(
    e.target.closest("#app"),
    "main-contents-container"
  );
  $mainContentsContainer.innerHTML = STATION_NAME_INPUT_FORM;
};

export default function routeDocumentClickEvent(e) {
  if (e.target.id === "station-manager-button") {
    showStationManagerPage(e);
  }
}

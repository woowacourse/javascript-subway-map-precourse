import StationManager from "./station-manager.js";

const MENU_BUTTONS_ID = {
  stationManagerButton: "station-manager-button",
  lineManagerButton: "line-manager-button",
  sectionManagerButton: "section-manager-button",
  mapPrintManagerButton: "map-print-manager-button",
};

const ADD_BUTTONS_ID = {
  stationAddButton: "station-add-button",
  lineAddButton: "line-add-button",
  sectionAddButton: "section-add-button",
};

const INPUT_FORM_ID = {
  stationNameInput: "station-name-input",
  lineNameInput: "line-name-input",
  sectionOrderInput: "section-order-input",
};

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
  <div>
    <label for="station-name-input">
      역 이름<br />
      <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요." />
    </label>
    <button id="station-add-button">역 추가</button>
  </div>
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

const isInputStringLengthTwoOrGreater = (input) => {
  if (input.length < 2) {
    alert("두 글자 이상 입력해주세요.");
    return false;
  }
  return true;
};

const isStationNameInputDuplicate = (input) => {
  if (new StationManager().hasName(input)) {
    alert("해당 역이 이미 존재합니다.");
    return true;
  }
  return false;
};

const isValidStationName = (name) => {
  return (
    isInputStringLengthTwoOrGreater(name) && !isStationNameInputDuplicate(name)
  );
};

// const addNewStationName = (name) => {};

const stationAddButtonHandler = (e) => {
  const stationNameInputValue = getChildById(
    e.target.parentNode.children[0],
    INPUT_FORM_ID.stationNameInput
  ).value;
  console.log(stationNameInputValue);
  console.log(isValidStationName(stationNameInputValue));
  // if (isValidStationName(stationNameInputValue)) {
  //   addNewStationName(stationNameInputValue);
  // }
};

export const menuButtonHandler = (e) => {
  if (e.target.id === MENU_BUTTONS_ID.stationManagerButton) {
    showStationManagerPage(e);
  }
};

export const addButtonHandler = (e) => {
  if (e.target.id === ADD_BUTTONS_ID.stationAddButton) {
    stationAddButtonHandler(e);
  }
};

import StationManager from "./station-manager.js";
import { getChildById } from "./custom-dom-handler.js";
import { DELETE_BUTTONS_CLASS } from "./html-constants/html-classnames.js";
import {
  ADD_BUTTONS_ID,
  INPUT_FORM_ID,
} from "./html-constants/html-id-values.js";

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

const stationAddButtonHandler = (e) => {
  const stationNameInputElement = getChildById(
    e.target.parentElement.children[0],
    INPUT_FORM_ID.stationNameInput
  );
  const stationNameInputValue = stationNameInputElement.value;
  stationNameInputElement.value = "";
  if (isValidStationName(stationNameInputValue)) {
    const stationManager = new StationManager();
    stationManager.addStation(stationNameInputValue);
  }
};

const stationRemoveButtonHandler = (e) => {
  const stationManager = new StationManager();
  const stationIndex = e.target.dataset.stationIndex * 1;
  const selectedStation = stationManager.stationList[stationIndex];
  if (confirm(`${selectedStation}역을 제거하시겠습니까?`)) {
    stationManager.removeStation(stationIndex);
  }
};

export default function stationManagerClickHandler(e) {
  if (e.target.id === ADD_BUTTONS_ID.stationAddButton) {
    stationAddButtonHandler(e);
  } else if (e.target.className === DELETE_BUTTONS_CLASS.stationDeleteButton) {
    stationRemoveButtonHandler(e);
  }
}

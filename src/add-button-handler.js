import StationManager from "./station-manager.js";
import { getChildById } from "./custom-dom-handler.js";
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
    stationManager.renderStationNameTable();
  }
};

export default function addButtonHandler(e) {
  if (e.target.id === ADD_BUTTONS_ID.stationAddButton) {
    stationAddButtonHandler(e);
  }
}

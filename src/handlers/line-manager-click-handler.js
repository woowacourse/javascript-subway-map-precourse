import LineManager from "../line-manager.js";
import { ADD_BUTTONS_ID } from "../html-constants/html-id-values.js";
// import { DELETE_BUTTONS_CLASS } from "../html-constants/html-classnames.js";
import {
  getLineNameInput,
  getStartStationSelector,
  getEndStationSelector,
} from "../handlers/custom-dom-handler.js";

const isLineNameInputValid = (appContainer) => {
  const $lineNameInput = getLineNameInput(appContainer);
  const lineNameInputValue = $lineNameInput.value;
  if (lineNameInputValue.length === 0) {
    alert("노선 이름을 입력해주세요.");
    return false;
  } else if (new LineManager().hasLineName(lineNameInputValue)) {
    alert("해당 노선 이름이 이미 존재합니다.");
    $lineNameInput.value = "";
    return false;
  }
  return true;
};

const isStationSelectorsValid = (appContainer) => {
  const startStation = getStartStationSelector(appContainer).value;
  const endStation = getEndStationSelector(appContainer).value;
  if (startStation === "") {
    alert("상행 종점을 선택해주세요.");
    return false;
  } else if (endStation === "") {
    alert("하행 종점을 입력해주세요.");
    return false;
  }
  return true;
};

const isLineFormValid = (appContainer) => {
  return (
    isLineNameInputValid(appContainer) && isStationSelectorsValid(appContainer)
  );
};

const lineAddButtonHandler = (e) => {
  const app = e.target.closest("#app");
  const $lineNameInput = getLineNameInput(app);
  if (isLineFormValid(app)) {
    new LineManager().addLine(
      $lineNameInput.value,
      getStartStationSelector(app).value,
      getEndStationSelector(app).value
    );
    $lineNameInput.value = "";
  }
  console.log(new LineManager().lineList);
};

export default function lineManagerClickHandler(e) {
  if (e.target.id === ADD_BUTTONS_ID.lineAddButton) {
    lineAddButtonHandler(e);
  }
}

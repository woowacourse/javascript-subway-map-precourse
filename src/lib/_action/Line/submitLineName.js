import { LINE_DIV, LINE_NAME_INPUT } from "../../common/IdAndClassNames.js";
import StartEndStationSelectors from "../../views/Line/StartEndStationSelectors.js";
import LineNameInputValidation from "../../controllers/line/lineNameInputValidation.js";

const selectStartAndEndStation = (lineName) => {
  const $lineInputContainer = document.querySelector(LINE_DIV);
  const $selectStartAndEndStations = new StartEndStationSelectors(lineName);
  console.log(`${lineName} 이 추가됩니다.`);

  $lineInputContainer.appendChild($selectStartAndEndStations.render());
};

export default (lineName) => {
  const $inputForm = document.querySelector(LINE_NAME_INPUT);
  const checkInput = new LineNameInputValidation(lineName);
  return new Promise((resolve, reject) => {
    if (checkInput.getInputResult().ok) {
      $inputForm.disabled = true;
      resolve(selectStartAndEndStation(lineName));
    } else {
      $inputForm.value = "";
      reject(alert(checkInput.getInputResult().message));
    }
  });
};

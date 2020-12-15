import { LINE_NAME_INPUT } from "../../common/IdAndClassNames.js";
import { ADD_LINE_INFO_ALERT } from "../../common/alertMessages.js";
import LineNameInputValidation from "../../controllers/line/lineNameInputValidation.js";

export default (lineName) => {
  const $inputForm = document.querySelector(LINE_NAME_INPUT);
  const checkInput = new LineNameInputValidation({ lineName });
  const { ok, message } = checkInput.getInputResult();
  return new Promise((resolve, reject) => {
    if (ok) {
      $inputForm.disabled = true;
      resolve(alert(ADD_LINE_INFO_ALERT));
    } else {
      $inputForm.value = "";
      reject(alert(message));
    }
  });
};

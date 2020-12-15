import AddNewLineInfoValidation from "../../checkValidation/line/addNewLineInfoValidation.js";
import { LINE_NAME_INPUT } from "../../common/IdAndClassNames.js";
import saveNewLine from "../../store/Line/saveNewLine.js";

export default (newLineInfo) => {
  const $lineNameInput = document.querySelector(LINE_NAME_INPUT);
  const checkNewLineInfo = new AddNewLineInfoValidation(newLineInfo);
  const { ok, message } = checkNewLineInfo.getInputResult();

  return new Promise((resolve, reject) => {
    if (!ok) {
      $lineNameInput.focus();
      reject(alert(message));
    } else {
      resolve(saveNewLine(newLineInfo));
    }
  });
};

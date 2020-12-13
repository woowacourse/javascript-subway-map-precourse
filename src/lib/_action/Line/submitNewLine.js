import AddNewLineInfoValidation from "../../controllers/line/addNewLineInfoValidation.js";
import saveNewLine from "../../_store/Line/saveNewLine.js";

export default (newLineInfo) => {
  const checkNewLineInfo = new AddNewLineInfoValidation(newLineInfo);

  return new Promise((resolve, reject) => {
    if (!checkNewLineInfo.getInputResult().ok) {
      reject(alert(checkNewLineInfo.getInputResult().message));
    } else {
      resolve(saveNewLine(newLineInfo));
    }
  });
};

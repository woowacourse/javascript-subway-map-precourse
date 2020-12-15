import DeleteStationValidation from "../../checkValidation/section/deleteStationValidation.js";
import deleteStationFromLine from "../../store/Section/deleteSection.js";
import { DELETE_MESSAGE_FROM_LINE } from "../../common/alertMessages.js";

export default (sectionData) => {
  if (!confirm(DELETE_MESSAGE_FROM_LINE)) return null;
  const deleteValidationCheck = new DeleteStationValidation(sectionData);
  const {
    ok,
    message,
    updatedLineList,
  } = deleteValidationCheck.getDeleteValidationResult();
  const { stationName } = sectionData;
  return new Promise((resolve, reject) => {
    if (!ok) {
      reject(alert(message));
    } else resolve(deleteStationFromLine(stationName, updatedLineList[0]));
  });
};

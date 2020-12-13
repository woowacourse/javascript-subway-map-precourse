import DeleteStationFromLineValidation from "../../controllers/section/deleteStationFromLineValidation.js";
import deleteStationFromLine from "../../_store/Section/deleteStationFromLine.js";
import { DELETE_MESSAGE_FROM_LINE } from "../../common/alertMessages.js";

export default (deletedStationName, updatedLineName) => {
  if (!confirm(DELETE_MESSAGE_FROM_LINE)) return null;
  const deleteValidationCheck = new DeleteStationFromLineValidation(
    deletedStationName,
    updatedLineName,
  );

  return new Promise((resolve, reject) => {
    if (!deleteValidationCheck.getDeleteValidationResult().ok) {
      reject(alert(deleteValidationCheck.getDeleteValidationResult().message));
    }
    resolve(deleteStationFromLine(deletedStationName, updatedLineName)); //나중에 else 추가
  });
};

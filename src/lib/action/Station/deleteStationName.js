import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { stationSelector } from "../../store/selectors.js";
import deleteStationData from "../../store/Station/deleteStationData.js";
import DeleteStationValidation from "../../checkValidation/section/deleteStationValidation.js";
import notConfirmDeleteAlert from "../common/notConfirmDeleteAlert.js";

export default ({ stationName }) => {
  if (!confirm(DELETE_MESSAGE)) return notConfirmDeleteAlert;
  const deleteValidationCheck = new DeleteStationValidation({ stationName });
  const index = stationSelector().indexOf(stationName);
  const {
    ok,
    message,
    updatedLineList,
  } = deleteValidationCheck.getDeleteValidationResult();
  return new Promise((resolve, reject) => {
    if (!ok) {
      reject(alert(message));
    } else resolve(deleteStationData(stationName, index, updatedLineList));
  });
};

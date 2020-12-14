import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { stationSelector } from "../../_store/selectors.js";
import deleteStationData from "../../_store/Station/deleteStationData.js";
import DeleteStationValidation from "../../controllers/section/deleteStationValidation.js";

export default ({ stationName }) => {
  if (!confirm(DELETE_MESSAGE)) return null;
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

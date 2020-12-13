import DeleteStationFromLineValidation from "../../controllers/section/deleteStationFromLineValidation.js";
import { DELETE_MESSAGE_FROM_LINE } from "../../common/alertMessages.js";

export default (deletedStationName, updatedLineName) => {
  if (!confirm(DELETE_MESSAGE_FROM_LINE)) return null;

  return new Promise((resolve, reject) => {
    resolve(
      console.log(
        `${deletedStationName}역이 ${updatedLineName}에서 삭제됩니다.`,
      ),
    );
  });
};

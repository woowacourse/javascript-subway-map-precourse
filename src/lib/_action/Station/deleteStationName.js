import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { stationSelector } from "../../_store/selectors.js";
import deleteStationData from "../../_store/Station/deleteStationData.js";
import DeleteStationFromLineValidation from "../../controllers/section/deleteStationFromLineValidation.js";

// 삭제 가능한지 체크
// 지울 역이 포함된 노선들을 찾는다.
// 해당 노선들 중 포함된 역이 2개 이하인게 하나라도 있으면 삭제할 수 없다.
// 그게 아니면 해당 노선 정보 수정한다.

// 업데이트 될 라인이 하나라도 있으면 넣어준다.

export default (deletedStation) => {
  if (!confirm(DELETE_MESSAGE)) return null;
  const deleteValidationCheck = new DeleteStationFromLineValidation(
    deletedStation,
  );
  const index = stationSelector().indexOf(deletedStation);
  const { ok, message, updatedLineList } = deleteValidationCheck.getDeleteValidationResult();
  return new Promise((resolve, reject) => {
    if (!ok) {
      reject(alert(message));
    } else resolve(deleteStationData(deletedStation, index, updatedLineList));
  });
};

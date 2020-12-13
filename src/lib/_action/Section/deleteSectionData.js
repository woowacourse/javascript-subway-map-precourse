import DeleteStationFromLineValidation from "../../controllers/section/deleteStationFromLineValidation.js";

export default (updatedLineName, deletedStationName) => {
  // check validation
  console.log("아 씨발 렌더링 왜 안되냐");
  return new Promise((resolve, reject) => {
    resolve(
      console.log(
        `${deletedStationName}역이 ${updatedLineName}에서 삭제됩니다.`,
      ),
    );
  });
};

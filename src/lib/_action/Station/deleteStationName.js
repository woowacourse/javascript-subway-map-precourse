import { DELETE_MESSAGE } from "../../common/alertMessages.js";
import { STATION_LIST } from "../../common/IdAndClassNames.js";

export default (deleteValue, index) => {
  const $dataTable = document.querySelector(STATION_LIST);
  console.log($dataTable.dataset);
  console.log(deleteValue, index);
  if (confirm(DELETE_MESSAGE) === true) {
    return new Promise((resolve) => {
      resolve(console.log("삭제될겁니다."));
    });
  }
};

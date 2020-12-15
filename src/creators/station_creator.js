import { getAdvancedEle } from "../common/visualization";

const StationCreator = function () {
  this.createAddWrapper = () =>
    getAdvancedEle("div", { id: "station-add-wrapper" });

  this.createAddTitle = () => getAdvancedEle("div", null, "역 이름");

  this.createAddInput = () =>
    getAdvancedEle("input", {
      id: "station-name-input",
      placeholder: "역 이름을 입력해주세요.",
    });

  this.createAddButton = () =>
    getAdvancedEle("button", { id: "station-add-button" }, "역 추가");
};

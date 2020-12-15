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

  this.createTableTitle = () => getAdvancedEle("h2", null, "🚉 지하철 역 목록");

  this.createAddDiv = () => {
    const div = this.createAddWrapper();
    const titleDiv = this.createAddTitle();
    const input = this.createAddInput();
    const button = this.createAddButton();
    appendChildren(div, titleDiv, input, button);
    return div;
  };
};

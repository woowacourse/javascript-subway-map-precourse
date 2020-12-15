import {
  appendChildren,
  appendRecursiveChild,
  getAdvancedEle,
} from "../common/visualization";

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

  this.createTr = (stationName) => {
    const tr = document.createElement("tr");
    const stationTd = getAdvancedEle("td", null, stationName);
    const buttonTd = document.createElement("td");
    const button = getAdvancedEle(
      "button",
      { class: "station-delete-button", "data-station-name": stationName },
      "삭제"
    );
    appendRecursiveChild(tr, stationTd, [buttonTd, button]);
    return tr;
  };

  this.createTbody = (stations) => {
    const tbody = document.createElement("tbody");
    stations.forEach((station) => {
      const tr = this.createTr(station);
      appendChildren(tbody, tr);
    });
    return tbody;
  };

  this.removeTr = (targetButton) => {
    const tr = targetButton.parentElement.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);
  };
};

export const { removeTr, createTr } = new StationCreator();

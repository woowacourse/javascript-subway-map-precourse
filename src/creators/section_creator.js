import { getFormattedStations } from "../common/function.js";
import {
  appendChildren,
  createStationOptions,
  createTd,
  getAdvancedEle,
} from "../common/visualization.js";

const SectionCreator = function () {
  this.createSectionAddSelect = () =>
    getAdvancedEle("select", { id: "section-selector" });

  this.createSectionAddInput = () =>
    getAdvancedEle("input", {
      id: "section-order-input",
      type: "number",
      placeholder: "순서",
    });

  this.createSectionAddButton = () =>
    getAdvancedEle("button", { id: "section-add-button" }, "등록");

  this.createTr = (indexTd, sectionTd, deleteButtonTd) => {
    const tr = document.createElement("tr");
    appendChildren(tr, indexTd, sectionTd, deleteButtonTd);
    return tr;
  };

  this.createDeleteButton = (section) =>
    getAdvancedEle(
      "button",
      {
        class: "section-delete-button",
        "data-section-name": section,
      },
      "노선에서 제거"
    );

  this.createSectionTrs = (sections) =>
    sections.map((section, index) => {
      const indexTd = createTd(index.toString());
      const sectionTd = createTd(section);
      const deleteButtonTd = createTd();
      const deleteButton = this.createDeleteButton(section);
      appendChildren(deleteButtonTd, deleteButton);
      const tr = this.createTr(indexTd, sectionTd, deleteButtonTd);
      return tr;
    });

  this.createManagementTitleText = (selectedLineName) =>
    getAdvancedEle(
      "h2",
      { id: "line-management-title" },
      `${selectedLineName} 관리`
    );

  this.createSectionAddTitle = () =>
    getAdvancedEle("h3", { id: "section-add-title" }, "구간 등록");

  this.createSectionAddDIV = () => {
    const div = document.createElement("div");
    const select = this.createSectionAddSelect();
    const stations = getFormattedStations();
    const options = createStationOptions(stations);
    const input = this.createSectionAddInput();
    const button = this.createSectionAddButton();
    appendChildren(select, ...options);
    appendChildren(div, select, input, button);
    return div;
  };

  this.createLineSelectionButtons = (lineNames) =>
    lineNames.map((lineName, index) =>
      getAdvancedEle(
        "button",
        {
          class: "section-line-menu-button",
          "data-line-index": index,
          "data-line-name": lineName,
        },
        lineName
      )
    );

  this.createInitialTitle = () =>
    getAdvancedEle("h2", null, "구간을 수정할 노선을 선택해주세요.");
};

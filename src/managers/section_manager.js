import { appendChildren, getAdvancedEle } from "../common/visualization";

const SectionManager = function () {
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

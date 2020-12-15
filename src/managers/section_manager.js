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
};

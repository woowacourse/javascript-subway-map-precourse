import { ELEMENT_INFO } from "../util/constants.js";

export default function SectionInput({ $target, stations, selectedLineName }) {
  this.$container = document.createElement("section");
  this.$container.className = "section-input";
  $target.append(this.$container);

  this.stations = stations;
  this.selectedLineName = selectedLineName;

  const { sectionStationSelector, sectionOrderInput, sectionAddButton } = ELEMENT_INFO;

  this.setState = (nextSelectedLineName) => {
    this.selectedLineName = nextSelectedLineName;

    this.render();
  };

  this.createSelectOptionHTMLString = () => {
    return this.stations.map((station) => `<option value="${station}">${station}</option>`).join("");
  };

  this.render = () => {
    this.$container.innerHTML =
      this.selectedLineName !== ""
        ? `
            <h2>${selectedLineName} 관리</h2>
            <form>
              <h3>구간 등록</h3>
              <select id="${sectionStationSelector.id}">${this.createSelectOptionHTMLString()}</select>
              <input type="number" name="${sectionOrderInput.text}" placeholder="${sectionOrderInput.text}" />
              <button id="${sectionAddButton.id}" type="submit">${sectionAddButton.text}</button>
            </form>
          `
        : "";
  };

  this.render();
}

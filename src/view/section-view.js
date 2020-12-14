import { Line } from "../model/line.js";
import { Element } from "./element.js";

export const SectionView = {
  render() {
    this.renderLineButton();
  },

  renderLineButton() {
    let content = "";

    Line.lines.forEach(({ name }) => {
      content += `
        <button class="section-line-menu-button" data-name="${name}">${name}</button>
      `;
    });

    Element.sectionLineMenu.innerHTML = content;
  },
};

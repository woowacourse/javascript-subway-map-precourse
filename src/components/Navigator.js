import { ELEMENT_INFO } from "../util/constants.js";

export default function Navigator({ $target, onTogglePosition }) {
  const { navigator: navInfo } = ELEMENT_INFO;

  this.onTogglePosition = onTogglePosition;
  this.$container = document.createElement("nav");
  $target.append(this.$container);

  this.bindOnClick = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        this.onTogglePosition(e.target.id);
      }
    });
  };

  this.render = () => {
    this.$container.innerHTML = `
      <ol>
        ${navInfo.map((nav, index) => `<li><button id="${nav.id}">${index + 1}. ${nav.text}</button></li>`).join("")}
      </ol>
    `;
  };

  this.render();
  this.bindOnClick();
}

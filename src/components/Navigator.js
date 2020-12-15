import { NAV_TEXTS } from "../util/constants.js";

export default function Navigator({ $target }) {
  this.$target = $target;
  this.NAV_TEXTS = NAV_TEXTS;

  this.render = () => {
    const HTMLString = `
      <nav>
        <ol>
          ${NAV_TEXTS.map((text, index) => `<li><button>${index + 1}. ${text}</button></li>`).join("")}
        </ol>
      </nav>
    `;

    this.$target.insertAdjacentHTML("beforeend", HTMLString);
  };

  this.render();
}

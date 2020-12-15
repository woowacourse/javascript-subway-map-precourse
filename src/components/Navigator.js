import { ELEMENT_INFO } from "../util/constants.js";

export default function Navigator({ $target }) {
  this.$target = $target;

  const { navigator: navInfo } = ELEMENT_INFO;

  this.render = () => {
    const HTMLString = `
      <nav>
        <ol>
          ${navInfo.map((nav, index) => `<li><button id="${nav.id}">${index + 1}. ${nav.text}</button></li>`).join("")}
        </ol>
      </nav>
    `;

    this.$target.insertAdjacentHTML("beforeend", HTMLString);
  };

  this.render();
}

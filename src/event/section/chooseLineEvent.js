import { renderSection } from "../../render/renderSection.js";

function onClickLine(event) {
  const $target = event.target;
  const targetName = $target.dataset.name;
  renderSection(targetName);
}

export default function addSectionEvent() {
  const $sectionLineMenuBtns = document.querySelectorAll(".section-line-menu-button");
  $sectionLineMenuBtns.forEach((button) =>
    button.addEventListener("click", (event) => {
      onClickLine(event);
    })
  );
}

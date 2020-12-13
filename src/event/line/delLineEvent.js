import renderLine from "../../render/renderLine.js";
import { alertMessage } from "../../alertMessage.js";

function delLine(line) {
  const lines = JSON.parse(localStorage.lines);
  for (let i = 0; i < lines.length; i++) {
    if (line === lines[i].name) {
      lines.splice(i, 1);
    }
  }

  localStorage.lines = JSON.stringify(lines);

  renderLine();
}

function findDeleteTarget(event) {
  const $target = event.target;
  const $lineTable = document.getElementsByClassName("line-table-row");
  const targetNumber = $target.closest("tr").dataset.number;
  const line = $lineTable[targetNumber].querySelector("span").innerText;

  delLine(line);
}

export default function delLineEvent() {
  const $delLineBtn = document.querySelectorAll(".line-delete-button");
  $delLineBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
        findDeleteTarget(event);
      }
    });
  });
}

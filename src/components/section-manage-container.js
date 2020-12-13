import { state } from "../index.js";

function loadEditSectionLines() {
  const parentDiv = document.getElementById("manage-sections");

  for (const line of state.subwayLines) {
    const lineManageBtn = document.createElement("button");
    lineManageBtn.innerHTML = line.lineName;
    console.log(line.lineName);
    parentDiv.append(lineManageBtn);
  }
}

export default function sectionManageContainer() {
  console.log(loadEditSectionLines());
}

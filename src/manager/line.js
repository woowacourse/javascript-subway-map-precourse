import { isSameDestination, isLineAlreadyExist } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Line() {
  const linePage = document.getElementById("line-page");
  const lineTable = document.getElementById("line-table");
  let stations;
  this.lines = [
    { name: "1호선", sections: ["인천", "소요산"] },
    { name: "2호선", sections: ["시청", "신도림"] },
    { name: "3호선", sections: ["대화", "오금"] },
  ];
  let count = this.lines.length;

  this.init = (stationList) => {
    stations = stationList;
    linePage.style.display = "block";
    this.showOptions();
    this.showLines();
    const lineDelBtns = document.getElementsByClassName("line-delete-button");
    for (let i = 0; i < lineDelBtns.length; i++) {
      lineDelBtns[i].addEventListener("click", (event) => this.deleteLine(event));
    }
    const lineInputBtn = document.getElementById("line-add-button");
    lineInputBtn.addEventListener("click", this.addLine);
  };

  this.showOptions = () => {
    const startStationSelector = document.getElementById("line-start-station-selector");
    const endStationSelector = document.getElementById("line-end-station-selector");
    const startHTML = `${stations
      .map((station) => `<option value=${station}>${station}</option>`)
      .join("")}`;
    const endHTML = `${stations
      .map((station) => `<option value=${station}>${station}</option>`)
      .join("")}`;
    startStationSelector.insertAdjacentHTML("beforeend", startHTML);
    endStationSelector.insertAdjacentHTML("beforeend", endHTML);
  };

  this.showLines = () => {
    let newHTML = "";
    for (let i = 0; i < this.lines.length; i++) {
      newHTML += `
      <tr id="line${i}">
        <td><span>${this.lines[i].name}</span></td>
        <td><span>${this.lines[i].sections[0]}</span></td>
        <td><span>${this.lines[i].sections[this.lines[i].sections.length - 1]}</span></td>
        <td><button class="line-delete-button" id="${i}" value=${
        this.lines[i].name
      }>삭제</button></td></tr>
      `;
    }
    lineTable.insertAdjacentHTML("beforeend", newHTML);
  };

  this.addLine = () => {
    const lineNameInput = document.getElementById("line-name-input").value;
    const lineStart = document.getElementById("line-start-station-selector").value;
    const lineEnd = document.getElementById("line-end-station-selector").value;
    if (isSameDestination(lineStart, lineEnd)) {
      return alert(alertMessage.SAME_DESTINATION_ERROR);
    } else if (isLineAlreadyExist(this.lines, lineNameInput)) {
      return alert(alertMessage.SAME_LINE_EXIST_ERROR);
    }
    const addHTML = `
      <tr id="line${count}">
        <td><span>${lineNameInput}</span></td>
        <td><span>${lineStart}</span></td>
        <td><span>${lineEnd}</span></td>
        <td><button class="line-delete-button" id="${count}" value=${lineNameInput}>삭제</button></td>
      </tr>`;
    this.lines.push({
      name: lineNameInput,
      sections: [lineStart, lineEnd],
    });
    lineTable.insertAdjacentHTML("beforeend", addHTML);
    const newLine = document.getElementById(`${count}`);
    newLine.addEventListener("click", (event) => this.deleteLine(event));
    count++;
  };
}

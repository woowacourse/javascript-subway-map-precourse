import { stationArray } from "../index.js";
import { container } from "../consts/consts.js";
import { inputValidator } from "../utils/utils.js";

const stationInputObj = document.createElement("input");
const stationAddButtonObj = document.createElement("button");
const stationParagraph = document.createElement("p");
const stationHeading = document.createElement("h2");
const stationTable = document.createElement("table");

stationInputObj.setAttribute("id", "station-name-input");
stationAddButtonObj.setAttribute("id", "station-add-button");
stationParagraph.innerText = "역 이름";
stationAddButtonObj.innerText = "역 추가";
stationHeading.innerText = "지하철 역 목록";
stationTable.innerHTML = `<tr><th>역 이름</th><th>설정</th></tr>`;

export const initStationManager = () => {
  stationInputObj.innerText = "역 이름을 입력해주세요.";

  container.appendChild(stationParagraph);
  container.appendChild(stationInputObj);
  container.appendChild(stationAddButtonObj);
  container.appendChild(stationHeading);
  container.appendChild(stationTable);

  stationAddButtonObj.addEventListener("click", handleStationAddButton);
};

export const handleStationAddButton = () => {
  const currentValue = stationInputObj.value;
  if (inputValidator(currentValue)) {
    stationArray.push(currentValue);

    const stationDeleteButtonObj = document.createElement("button");
    stationDeleteButtonObj.setAttribute("class", "station-delete-button");
    stationDeleteButtonObj.innerText = "삭제";

    stationDeleteButtonObj.addEventListener("click", () =>
      handleStationDeleteButton(currentValue)
    );

    insertTable(stationInputObj.value, stationDeleteButtonObj);
  }
};

export const handleStationDeleteButton = (value) => {
  const index = stationArray.indexOf(value);
  stationTable.deleteRow(index + 1);
  stationArray.splice(index, 1);
};

export const insertTable = (data_1, data_2) => {
  const row = stationTable.insertRow(-1);
  const cell_1 = row.insertCell(0);
  const cell_2 = row.insertCell(1);

  cell_1.innerHTML = data_1;
  cell_2.appendChild(data_2);
};

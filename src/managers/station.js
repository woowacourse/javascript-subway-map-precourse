import { stationArray } from "../index.js";
import { container } from "../consts/consts.js";
import { inputValidator, createElement } from "../utils/utils.js";

const stationInputElement = createElement("input");
const stationAddButtonElement = createElement("button");
const stationParagraph = createElement("p");
const stationHeading = createElement("h2");
const stationTable = createElement("table");
const stationHTMLElements = [
  stationParagraph,
  stationInputElement,
  stationAddButtonElement,
  stationHeading,
  stationTable,
];

stationInputElement.setAttribute("id", "station-name-input");
stationAddButtonElement.setAttribute("id", "station-add-button");
stationParagraph.innerText = "역 이름";
stationAddButtonElement.innerText = "역 추가";
stationHeading.innerText = "지하철 역 목록";
stationTable.innerHTML = `<tr><th>역 이름</th><th>설정</th></tr>`;

export const initStationManager = () => {
  stationInputElement.innerText = "역 이름을 입력해주세요.";

  stationHTMLElements.map((item) => container.appendChild(item));

  stationAddButtonElement.addEventListener("click", handleStationAddButton);
};

const handleStationAddButton = () => {
  const currentValue = stationInputElement.value;
  if (inputValidator(currentValue)) {
    stationArray.push(currentValue);

    const stationDeleteButtonObj = document.createElement("button");
    stationDeleteButtonObj.setAttribute("class", "station-delete-button");
    stationDeleteButtonObj.innerText = "삭제";

    stationDeleteButtonObj.addEventListener("click", () =>
      handleStationDeleteButton(currentValue)
    );

    insertTable(stationInputElement.value, stationDeleteButtonObj);
  }
};

const handleStationDeleteButton = (value) => {
  if (!confirm("정말로 삭제하시겠습니까?")) return;

  const index = stationArray.indexOf(value);
  stationTable.deleteRow(index + 1);
  stationArray.splice(index, 1);

  updateStationData();
};

const insertTable = (data_1, data_2) => {
  const row = stationTable.insertRow(-1);
  const cell_1 = row.insertCell(0);
  const cell_2 = row.insertCell(1);

  cell_1.innerHTML = data_1;
  cell_2.appendChild(data_2);

  updateStationData();
};

const updateStationData = () => {
  window.localStorage.station = stationArray;
};

import { container } from "../consts/consts.js";
import { createElement } from "../utils/utils.js";

const lineAddContainer = createElement("p");
const lineStartContainer = createElement("div");
const lineEndContainer = createElement("div");
const lineParagraph = createElement("div");
const lineInputElement = createElement("input");
const lineStartSpan = createElement("span");
const lineStartSelect = createElement("select");
const lineEndSpan = createElement("span");
const lineEndSelect = createElement("select");
const lineAddButtonElement = createElement("button");
const lineHeading = createElement("h2");
const lineTable = createElement("table");
const lineHTMLElements = [
  lineAddContainer,
  lineStartContainer,
  lineEndContainer,
  lineAddButtonElement,
  lineHeading,
  lineTable,
];

lineAddContainer.append(lineParagraph, lineInputElement);
lineStartContainer.append(lineStartSpan, lineStartSelect);
lineEndContainer.append(lineEndSpan, lineEndSelect);
lineInputElement.setAttribute("id", "line-name-input");
lineStartSelect.setAttribute("id", "line-start-station-selector");
lineEndSelect.setAttribute("id", "line-end-station-selector");
lineAddButtonElement.setAttribute("id", "line-add-button");

lineParagraph.innerText = "노선 이름";
lineStartSpan.innerText = "상행 종점";
lineEndSpan.innerText = "하행 종점";
lineAddButtonElement.innerText = "노선 추가";
lineHeading.innerText = "지하철 노선 목록";
lineTable.innerHTML = `<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>`;

export const initLineManager = () => {
  lineInputElement.innerText = "노선 이름을 입력해주세요";

  lineHTMLElements.map((item) => container.appendChild(item));
};

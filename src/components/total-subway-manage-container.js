import stationManageContainer from "./station-manage-container.js";
import lineManageContainer from "./line-manage-container.js";
import { state } from "../index.js";

const menuIDs = {
  0: {
    id: "manage-station",
    html: `
      <div id="manage-station">
        <div>
          <h4>역 이름</h4>
          <input
            id="station-name-input"
            type="text"
            placeholder="역 이름을 입력해주세요."
          />
          <button id="station-add-button">역 추가</button>
        </div>

        <div>
          <h2>🚉 지하철 역 목록</h2>
          <table border="1">
            <thead>
              <tr>
                <th>역 이름</th>
                <th>설정</th>
              </tr>
            </thead>
            <tbody id="stations"></tbody>
          </table>
        </div>
      </div>`,
  },
  1: {
    id: "manage-lines",
    html: `
        <div id="manage-lines">
          <div>
            <h4>노선 이름</h4>
            <input
              id="line-name-input"
              type="text"
              placeholder="노선 이름을 입력해주세요."
            />
            <div class="line-select-box">
              상행 종점
              <select id="line-start-station-selector"></select><br />
              하행 종점
              <select id="line-end-station-selector"></select>
            </div>
            <button id="line-add-button">노선 추가</button>
          </div>

          <div>
            <h2>🚉 지하철 역 목록</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>노선 이름</th>
                  <th>상행 종점역</th>
                  <th>하행 종점역</th>
                  <th>설정</th>
                </tr>
              </thead>
              <tbody id="lines"></tbody>
            </table>
          </div>
      </div>
    `,
  },
  2: {
    id: "manage-sections",
    html: `
  <div id="manage-sections">
    <h4>구간을 수정할 노선을 선택해 주세요.</h4>
  </div>`,
  },
  3: { id: "manage-map-print", html: `` },
};

const menus = document.querySelectorAll("#menu > button");
const menuIndexArray = [...Array(menus.length).keys()];

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createDOM(index) {
  const html = menuIDs[index].html;

  const createdDOM = new DOMParser().parseFromString(html, "text/html");

  return createdDOM.body.firstChild;
}

export default function totalSubwayManageContainer() {
  const content = document.getElementById("content");

  for (const [index, child] of menus.entries()) {
    const elementToHide = menuIndexArray.filter((x) => {
      return x !== index;
    });

    child.addEventListener("click", () => {
      removeAllChild(content);
      content.appendChild(createDOM(index));
      if (index === 0) {
        new stationManageContainer(state);
      } else if (index === 1) {
        new lineManageContainer(state);
      }
    });
  }
}

import { HTMLUtil } from "../HTMLFactory.js"

export const hideLineHTML = () => {
    const lineHTML = document.querySelector("#line-manager-div");

    if (lineHTML) {
        document.querySelector("#app").removeChild(lineHTML);
    }
};

export const showLineHTML = (HTML) => {
    document.querySelector("#app").appendChild(HTML);
};

export const makeLineHTML = (stationRepository, lineRepository) => {
    let lineHTML = HTMLUtil.makeTag({ tag: "div", id: "line-manager-div" });

    lineHTML.appendChild(HTMLUtil.makeTag({ tag: "br" }));
    lineHTML.innerHTML += makeLineNameInputHTML()
        + makeSelectHTML(stationRepository, "start")
        + makeSelectHTML(stationRepository, "end")
        + makeAddButton()
        + makeLineTable(lineRepository);

    return lineHTML;
};

const makeLineNameInputHTML = () => {
    return `<div>
                <div>노선 이름</div>
                <input id ="line-name-input" placeholder = "노선 이름을 입력해주세요">
            </div>
            <br>`;
};

const makeSelectHTML = (stationRepository, startOrEnd) => {
    const line = { "start": "상행", "end": "하행" };
    let selectHTML = `<div>
                          <span>${line[startOrEnd]} 종점</span> 
                          <select id=line-${startOrEnd}-station-selector>
                          ${makeOption(stationRepository, startOrEnd)}
                          </select>
                      </div>`;

    return selectHTML;
};

const makeOption = (stationRepository, startOrEnd) => {
    let options = "";
    for (const station of Object.values(stationRepository)) {
        options += `<option data-${startOrEnd}-station=${station.name}>${station.name}</option>`;
    }

    return options;
};

const makeAddButton = () => {
    return `<br><button id=line-add-button>노선 추가</button><br>`;
};

const makeLineTable = (lineRepository) => {
    let HTMLAboutLineTable = `<div>
                                  <h2>🚉 지하철 노선 목록</h2>
                                  <table border=1px id=line-table> <th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th>
                                  ${makeRow(lineRepository)}
                                  </table>
                              </div>`;

    return HTMLAboutLineTable;
};

const makeRow = (lineRepository) => {
    let rows = "";

    for (const line of Object.values(lineRepository)) {
        rows += `<tr data-line-name = ${line.name}>
                    <td>${line.name}</td>
                    <td>${line.stationArray[0]}</td>
                    <td>${line.stationArray[line.stationArray.length - 1]}</td>
                    <td><button class="line-delete-button">삭제</button></td>
                </tr>`;
    }

    return rows;
};
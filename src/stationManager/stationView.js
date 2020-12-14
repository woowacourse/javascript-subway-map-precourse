import { HTMLUtil } from "../HTMLFactory.js";

export const removeStationManagerHTML = () => {
    const stationHTML = document.querySelector("#station-manager-div")
    if (stationHTML) {
        document.querySelector("#app").removeChild(stationHTML);
    }
}

export const addResultToBody = (HTML) => {
    document.querySelector("#app").appendChild(HTML)
}

export const makeStationHTML = (stationRepository) => {
    let stationHTML = HTMLUtil.makeTag({ tag: "div", id: "station-manager-div" })

    stationHTML.appendChild(HTMLUtil.makeTag({ tag: "br" }));
    stationHTML.innerHTML += getHTMLAboutStationAdd() + getHTMLAboutStationTable(stationRepository);

    return stationHTML;
}

const getHTMLAboutStationAdd = () => {
    return `<div>
                <div>역 이름</div>
                <input id = "station-name-input" placeholder="역 이름을 입력해주세요."> 
                <button id = "station-add-button">역 추가</button>
            </div>`;
}

const getHTMLAboutStationTable = (stationRepository) => {
    let HTMLAboutStations = `<div> 
                                <h2>🚉 지하철 역 목록</h2>
                                <table border=1px id=station-name-table>
                                    <th>역 이름</th><th>설정</th>
                                    ${makeStationTableRow(stationRepository)}
                                </table>
                            </div>`;

    return HTMLAboutStations;
}

const makeStationTableRow = (stationRepository) => {
    let rows = "";
    Object.keys(stationRepository).forEach(stationName => {
        rows += `<tr data-station-name = ${stationName}>
                    <td>${stationName}</td>
                    <td><button class="station-delete-button" >삭제</button></td>
                </tr>`
    });

    return rows;
}
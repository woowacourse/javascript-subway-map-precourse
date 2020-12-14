import { Data } from "../component/data.js"
import { HTMLUtil } from "../component/HTMLFactory.js"
import { dataText } from "../component/text.js"

export const makeSectionHTML = (lineRepository) => {
    let sectionHTML = HTMLUtil.makeTag({ tag: "div", id: "section-manager-div" });

    sectionHTML.innerHTML = makeLineButtonHTML(lineRepository);

    return document.querySelector("#app").appendChild(sectionHTML);
};

export const removeSectionHTML = () => {
    let sectionHTML = document.querySelector("#section-manager-div");

    if (sectionHTML) {
        document.querySelector("#app").removeChild(sectionHTML);
    }
};

export const makeSubSectionHTML = (lineName, stationRepository) => {
    let sectionHTML = HTMLUtil.makeTag({ tag: "div", id: "sub-section-manager-div" });

    sectionHTML.innerHTML = makeSectionInputHTML(lineName, stationRepository) + makeSectionTableHTML(lineName);

    document.querySelector("#section-manager-div").appendChild(sectionHTML);
};

export const removeSubSectionHTML = () => {
    let sectionDiv = document.querySelector("#sub-section-manager-div");

    if (sectionDiv) {
        document.querySelector("#section-manager-div").removeChild(sectionDiv);
    }
};

const makeLineButtonHTML = (lineRepository) => {
    return `<div>
                <h3>구간을 수정할 노선을 선택해주세요.</h3>
                ${Object.keys(lineRepository).map((lineName) => `<button class=section-line-menu-button data-selected-line=${lineName}>${lineName}</button>`).join(" ")}
            </div>`;
};

const makeSectionInputHTML = (lineName, stationRepository) => {
    let lineInputHTML = `<h3>${lineName} 관리<h3>
                         <h4>구간 등록</h4> 
                         <select id = section-station-selector>
                             ${makeOption(stationRepository)}
                         </select>
                         <input type=number placeholder=순서 id=section-order-input> 
                         <button id=section-add-button>등록</button>
                         <br><br><br>
                         `;

    return lineInputHTML;
};

const makeSectionTableHTML = (lineName) => {
    const stations = Data.getLineRepository()[lineName][dataText.STATION_ARRAY];
    let sectionTableHTML = `<table border="1">
                                <th>순서</th><th>이름</th><th>설정</th>
                                ${makeSectionTableRow(stations)}
                            </table>`;

    return sectionTableHTML;
};

const makeOption = (stationRepository) => {
    return Object.keys(stationRepository).map((station) =>
        `<option data-selected-station=${station}>${station}</option>`).join("");
};

const makeSectionTableRow = (stations) => {
    return stations.map((station, index) =>
        `<tr data-selected-index = ${index}>
            <td>${index}</td>
            <td>${station}</td>
            <td><button class=section-delete-button>노선에서 제거</button></td>
         </tr>`
    ).join("");
};
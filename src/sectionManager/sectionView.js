import { Data } from "../data.js"

export const templateLineButtonHTML = (lineRepository) => {
    let lineButtonHTML = document.createElement("div")

    lineButtonHTML.setAttribute("id", "section-manager-div");
    lineButtonHTML.innerHTML = `<h3>구간을 수정할 노선을 선택해주세요.</h3>`;
    lineButtonHTML.innerHTML += Object.keys(lineRepository).map((lineName) => `<button class=section-line-menu-button data-selected-line=${lineName}>${lineName}</button>`).join("")
    return document.querySelector("body").appendChild(lineButtonHTML)
}

export const removeSectionHTML = () => {
    let sectionHTML = document.querySelector("#section-manager-div")
    if (sectionHTML) {
        document.querySelector("body").removeChild(sectionHTML);
    }
}

export const removeSubSectionHTML = () => {
    let sectionDiv = document.querySelector("#sub-section-manager-div")
    if (sectionDiv) {
        document.querySelector("#section-manager-div").removeChild(sectionDiv);
    }
}

export const templateSectionHTML = (lineName, stationRepository) => {
    let sectionHTML = document.createElement("div");

    sectionHTML.setAttribute("id", "sub-section-manager-div");
    sectionHTML.innerHTML = templateSectionInputHTML(lineName, stationRepository);
    sectionHTML.innerHTML += templateSectionTableHTML(lineName);
    document.querySelector("#section-manager-div").appendChild(sectionHTML)
}

const templateSectionInputHTML = (lineName, stationRepository) => {
    let lineInputHTML = `<h3>${lineName} 관리<h3>
                        <h4>구간 등록</h4> 
                        <select id = section-station-selector>`;
    lineInputHTML += Object.keys(stationRepository).map((station) => `<option data-selected-station=${station}>${station}</option>`).join("");
    lineInputHTML += `</select>
                     <input type=number placeholder=순서 id=section-order-input> 
                     <button id=section-add-button>등록</button><br><br><br>`;

    return lineInputHTML;
}

export const templateSectionTableHTML = (lineName) => {
    const stations = Data.getLineRepository()[lineName]["stationArray"];
    let sectionTableHTML = `<table border="1">
	                        <th>순서</th>
	                        <th>이름</th>
                            <th>설정</th>`

    sectionTableHTML += stations.map((station, index) =>
        `<tr data-selected-index = ${index}>
            <td>${index}</td>
            <td>${station}</td>
            <td><button class=section-delete-button>노선에서 제거</button></td>
        </tr>`
    ).join("")

    return sectionTableHTML += `</table>`
}
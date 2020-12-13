import { Data } from "../data.js"

export const hideLineHTML = () => {
    const lineHTML = document.querySelector("#line-manager-div");
    if (lineHTML) {
        document.querySelector("body").removeChild(lineHTML);
    }
}

export const showLineHTML = (HTML) => {
    document.querySelector("body").appendChild(HTML);
}

export const makeLineHTML = (stationRepository, lineRepository) => {
    let lineHTML = document.createElement("div");

    lineHTML.setAttribute("id", "line-manager-div");
    lineHTML.innerHTML = makeLineNameInputHTML();
    lineHTML.innerHTML += makeSelectHTML(stationRepository, "start");
    lineHTML.innerHTML += makeSelectHTML(stationRepository, "end");
    lineHTML.innerHTML += makeAddButton();
    lineHTML.innerHTML += makeLineTable(lineRepository);

    return lineHTML;
}

const makeLineNameInputHTML = () => {
    return `<div>
            <div>노선 이름</div>
            <input id ="line-name-input" placeholder = "노선 이름을 입력해주세요">
            </div>
            <br>`
}

const makeSelectHTML = (stationRepository, where) => {
    let selectHTML = "<div><span>상행 종점</span> ";
    let stationSeletTag = ` <select id=line-${where}-station-selector>`

    if (where === "end") {
        selectHTML = "<div><span>하행 종점</span>";
    }

    for (const station of Object.values(stationRepository)) {
        stationSeletTag += `<option data-${where}-station=${station.name}>${station.name}</option>`
    }

    return selectHTML += stationSeletTag + "</select>" + "</div>"
}

const makeAddButton = () => {
    return `<br><button id=line-add-button>노선 추가</button><br>`
}

const makeLineTable = (lineRepository) => {
    let HTMLAboutLineTable = "<div> <h2>🚉 지하철 노선 목록</h2>";

    HTMLAboutLineTable += "<table border=1px id=line-table> <th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th>";

    for (const line of Object.values(lineRepository)) {
        HTMLAboutLineTable += `<tr data-line-name = ${line.name}>
                                <td>${line.name}</td>
                                <td>${line.stationArray[0]}</td>
                                <td>${line.stationArray[line.stationArray.length - 1]}</td>
                                <td><button class="line-delete-button">삭제</button></td>
                               </tr>`
    }

    return HTMLAboutLineTable += "</table> </div>"
}
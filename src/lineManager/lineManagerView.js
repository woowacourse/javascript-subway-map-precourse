import { Data } from "../data.js"

export const removeLineHTML = () => {
    const lineHTML = document.querySelector("#line-manager-div");
    if (lineHTML) {
        document.querySelector("body").removeChild(lineHTML);
    }
}

export const addLineHTMLtoBody = (HTML) => {
    document.querySelector("body").appendChild(HTML);
    addEventToDeleteButton();
}

export const makeLineManagerHTML = (stationRepository, lineRepository) => {
    let lineManagerHTML = document.createElement("div");

    lineManagerHTML.setAttribute("id", "line-manager-div");
    lineManagerHTML.innerHTML = makeLineNameInputHTML();
    lineManagerHTML.innerHTML += makeSelectHTML(stationRepository, "start");
    lineManagerHTML.innerHTML += makeSelectHTML(stationRepository, "end");
    lineManagerHTML.innerHTML += makeAddButton();
    lineManagerHTML.innerHTML += makeLineTable(lineRepository);

    return lineManagerHTML;
}

const makeLineNameInputHTML = () => {
    return `<div>
            <div>노선 이름</div>
            <input id ="line-name-input" placeholder = "노선 이름을 입력해주세요">
            </div><br>`
}

const makeSelectHTML = (stationRepository, where) => {
    let selectHTML = "<div><span>상행 종점</span> ";
    let stationSeletTag = ` <select id=line-${where}-station-selector>`

    if (where === "end") {
        selectHTML = "<div><span>하행 종점</span>";
    }

    Object.keys(stationRepository).forEach(stationName => {
        stationSeletTag += `<option data-${where}-station=${stationName}>${stationName}</option>`
    });

    return selectHTML += stationSeletTag + "</select>" + "</div>"
}

const makeAddButton = () => {
    return `<br><button id=line-add-button>노선 추가</button><br>`
}

const makeLineTable = (lineRepository) => {
    let HTMLAboutLineTable = "<div> <h2>🚉 지하철 노선 목록</h2>";

    HTMLAboutLineTable += "<table border=1px id=line-table> <th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th>";
    for (const line in lineRepository) {
        if (lineRepository.hasOwnProperty(line)) {
            HTMLAboutLineTable += `<tr data-line-name = ${lineRepository[line].name}>
                                    <td>${lineRepository[line].name}</td>
                                    <td>${lineRepository[line].stationArray[0]}</td>
                                    <td>${lineRepository[line].stationArray[lineRepository[line].stationArray.length - 1]}</td>
                                    <td><button class="line-delete-button">삭제</button></td>
                                   </tr>`
        }
    }

    return HTMLAboutLineTable += "</table> </div>"
}

const addEventToDeleteButton = () => {
    let deleteButtons = document.querySelectorAll(".line-delete-button")
    Array.prototype.forEach.call(deleteButtons, function (button) {
        button.addEventListener("click", function (button) {
            Data.removeLine(button.target.parentNode.parentNode.dataset.lineName);
            document.querySelector("#line-table tbody").removeChild(this.parentElement.parentElement);
        })
    })
}

export const addLineToTable = (lineName, startStation, endStation) => {
    let addHTML = `<tr data-line-name = ${lineName}>
                    <td>${lineName}</td>
                    <td>${startStation}</td>
                    <td>${endStation}</td>
                    <td><button class="line-delete-button">삭제</button></td>
                    </tr>`
    document.querySelector("#line-table tbody").innerHTML += addHTML;
    addEventToDeleteButton();
}
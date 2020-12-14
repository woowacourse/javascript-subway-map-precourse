import { HTMLUtil } from "../HTMLFactory.js"

export const showMapHTML = (lineRepository) => {
    let body = document.querySelector("#app");
    let mapHTML = makeTotalMap(lineRepository);

    body.appendChild(mapHTML);
};

export const hideMapHTML = () => {
    let mapHTML = document.querySelector(".map");
    if (mapHTML) {
        document.querySelector("#app").removeChild(mapHTML);
    }
};

const makeTotalMap = (lineRepository) => {
    let mapHTML = HTMLUtil.makeTag({ tag: "div", classe: "map" });
    let allLineMap = ""

    for (const line of Object.values(lineRepository)) {
        allLineMap += templateOneLineMap(line);
    }

    mapHTML.innerHTML = allLineMap;

    return mapHTML;
};

const templateOneLineMap = (line) => {
    let oneLineMapHTML = `<div>
                            <h3>${line.name}</h3>
                            <ul>
                            ${line.stationArray.map((station) => `<li>${station}</li>`).join("")}
                            </ul>
                          </div>`;

    return oneLineMapHTML;
};
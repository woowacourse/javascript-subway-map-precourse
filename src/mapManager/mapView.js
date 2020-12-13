export const showMapHTML = (lineRepository) => {
    let body = document.querySelector("body")
    let mapHTML = templateTotalMap(lineRepository);

    body.appendChild(mapHTML);
}

export const hideMapHTML = () => {
    let mapHTML = document.querySelector(".map")
    if (mapHTML) {
        document.querySelector("body").removeChild(document.querySelector(".map"));
    }
}

const templateTotalMap = (lineRepository) => {
    let mapHTML = document.createElement("div");

    mapHTML.setAttribute("class", "map")

    for (const line of Object.values(lineRepository)) {
        mapHTML.innerHTML += templateOneLineMap(line);
    }

    return mapHTML;
}

const templateOneLineMap = (line) => {
    let oneLineMapHTML = `<div><h3>${line.name}</h3><ul>`;

    oneLineMapHTML += line.stationArray.map((station) => `<li>${station}</li>`).join("");
    oneLineMapHTML += `</ul></div>`;

    return oneLineMapHTML;
}
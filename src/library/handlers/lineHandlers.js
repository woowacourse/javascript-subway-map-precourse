import render from "../../components/render.js";
import app from "../../components/app.js";
import { validateInput, validateStartAndEndStations } from "../validation/validation.js";

function onLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
  document.getElementById("line-add-button").addEventListener("click", onAddLineHandler);
}

function onAddLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let lineName = validateInput(document.getElementById("line-name-input").value, "line-name-input");

  if (lineName !== "") {
    // console.log(lineName);
    let line = {
      name: name,
      stops: [],
    };

    line.name = lineName;
    let startAndEndStations = [];
    startAndEndStations.push(document.getElementById("line-start-station-selector").value, document.getElementById("line-end-station-selector").value);
    let validatedStartAndEndStations = validateStartAndEndStations(startAndEndStations);

    if (validatedStartAndEndStations !== "") {
      console.log(validatedStartAndEndStations);
      line.stops.push(validatedStartAndEndStations[0]);
      line.stops.push(validatedStartAndEndStations[0]);

      let startStop = line.stops[0];
      let endStop = line.stops[line.stops.length - 1];

      //상행선 역 정보에 노선 정보 추가
      subwayDatas.subwayStations.forEach((station, idx) => {
        if (startStop === station.name) {
          subwayDatas.subwayStations[idx].line.push(line.name);
        }
      });

      //하행선 역 정보에 노선 정보 추가
      subwayDatas.subwayStations.forEach((station, idx) => {
        if (endStop === station.name) {
          subwayDatas.subwayStations[idx].line.push(line.name);
        }
      });

      subwayDatas.lines.push(line);
      localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));

      render(app("line", subwayDatas));
      subwayDatas && updateEvent();
    }
  }
}

function updateEvent() {
  document.getElementById("line-add-button").addEventListener("click", onAddLineHandler);

  let deleteBtns = document.getElementsByClassName("line-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteLineHandler);
  }
}

function onDeleteLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let deleteTarget = event.target.parentNode.parentNode.childNodes[1].outerText;

  subwayDatas.lines.forEach((line, idx) => {
    if (line.name === deleteTarget) {
      subwayDatas.lines.splice(idx, 1);
      localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
      render(app("line", subwayDatas));
      updateEvent();
    }
  });
}

export { onLineHandler };

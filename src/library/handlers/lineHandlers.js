import render from "../../components/render.js";
import app from "../../components/app.js";
import lineManagerPage from "../../components/pages/linePage.js";

// stations = [{name:"왕십리", line:["중앙선","2호선"]}, {name:"회기", line:["중앙선","1호선"]}]
// lines = [{name:"1호선", stops:["인천","동대문","왕십리","회기"]}]

// let lines = JSON.parse(localStorage.getItem("lines"));

function onLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
  document.getElementById("line-add-button").addEventListener("click", onAddLineHandler);
}

function onAddLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let lines = {
    name: name,
    stops: [],
  };

  lines.name = document.getElementById("line-name-input").value;
  lines.stops.push(document.getElementById("line-start-station-selector").value);
  lines.stops.push(document.getElementById("line-end-station-selector").value);

  subwayDatas.lines.push(lines);
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  // console.log(localStorage.getItem("subwayDatas"));
  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
}

function updateEvent() {
  document.getElementById("line-add-button").addEventListener("click", onAddLineHandler);

  let deleteBtns = document.getElementsByClassName("line-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteLineHandler);
  }
}

function onDeleteLineHandler() {
  // console.log(event.target);
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let deleteTarget = event.target.parentNode.parentNode.childNodes[1].outerText;

  // console.log(tr.childNodes[1].outerText); //1호선
  // let deleteKey = subwayDatas.lines.keys(tr.childNodes[1].outerText); //1호선의 키값

  // let idx = 0;
  subwayDatas.lines.forEach((line, idx) => {
    // console.log(line.name, tr.childNodes[1].outerText);
    if (line.name === deleteTarget) {
      subwayDatas.lines.splice(idx, 1);
      // console.log(subwayDatas.lines);
      localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
      render(app("line", subwayDatas));
      updateEvent();
    }
  });
}

export { onLineHandler };

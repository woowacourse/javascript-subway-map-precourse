import render from "../../components/render.js";
import app from "../../components/app.js";

function onSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("section", subwayDatas));
  //   console.log(document.getElementById("selected-line-section-manager"));

  //   document.getElementById("selected-line-section-manager").style.visibility = "hidden";

  let lineBtns = document.getElementsByClassName(".section-line-menu-button");

  for (let i = 0; i < lineBtns.length; i++) {
    let eachBtn = lineBtns[i];
    eachBtn.addEventListener("click", onLineSelectHandler);
  }
}

function onLineSelectHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let targetLine = event.target.innerText;
  //   console.log(targetLine);
  subwayDatas.targetLine = targetLine;
  render(app("section", subwayDatas));

  //   document.getElementById("selected-line-section-manager").style.visibility = "visible";
  //   document.getElementById("selected-line-section-manager").dataset.selectedButton = targetLine;

  //   console.log(document.getElementById("selected-line-section-manager").dataset);
}

export { onSectionHandler };

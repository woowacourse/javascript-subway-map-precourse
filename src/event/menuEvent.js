import render from "../render/render.js";
import checkLocalStorageItem from "./common/checkStorageItem.js";
import addStationEvent from "./station/addStationEvent.js";
import addLineEvent from "./line/addLineEvent.js";
import chooseLineEvent from "./section/chooseLineEvent.js";

function setHiddenPages() {
  const $page = document.querySelectorAll(".page");
  $page.forEach((page) => (page.style.display = "none"));
}

function changeManagerContainer({ target }) {
  setHiddenPages();
  if (target.id === "station-manager-button") {
    document.getElementById("station-page").style.display = "block";
    addStationEvent();
    render("station");
  } else if (target.id === "line-manager-button") {
    document.getElementById("line-page").style.display = "block";
    addLineEvent();
    render("line");
  } else if (target.id === "section-manager-button") {
    document.getElementById("section-page").style.display = "block";
    render("section");
    chooseLineEvent();
  } else if (target.id === "map-print-manager-button") {
    document.getElementById("map-print-page").style.display = "block";
    render("mapPrint");
  }
}

export default function menuEvent() {
  const $menuButton = document.querySelector(".menu-button");
  checkLocalStorageItem();
  $menuButton.addEventListener("click", changeManagerContainer);
}

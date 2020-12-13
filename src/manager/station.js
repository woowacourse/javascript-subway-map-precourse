import render from "../render/render.js";
import { isSatisfyLength, isStationAlreadyExist, isStationOnLine } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

function addStations() {}

function showStations() {
  console.log(localStorage.statios);
}

export default function manageStation() {
  render("station");
  showStations();
}

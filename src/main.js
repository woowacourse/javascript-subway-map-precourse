import { initHTML, addEventToMainBtns } from "./managers/init.js";
import render from "./managers/render.js";
import app from "./components/app.js";

export default function main() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  if (!subwayDatas) {
    let subwayDatas = {
      subwayStations: [],
      lines: [],
    };
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  }

  initHTML();
  render(app());
  addEventToMainBtns();
}

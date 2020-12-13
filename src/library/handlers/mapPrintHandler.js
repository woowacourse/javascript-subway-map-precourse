import render from "../../components/render.js";
import app from "../../components/app.js";

function onMapPrintHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("map", subwayDatas));
}

export { onMapPrintHandler };

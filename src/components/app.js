import stationManagerPage from "./pages/stationPage.js";
import lineManagerPage from "./pages/linePage.js";
import sectionManagerPage from "./pages/sectionPage.js";
import mapPrintManagerPage from "./pages/mapPrintPage.js";

export default function app(pageName, subwayDatas) {
  let app = ``;

  if (pageName === "station") {
    app = stationManagerPage(subwayDatas);
  } else if (pageName === "line") {
    app = lineManagerPage(subwayDatas);
  } else if (pageName === "section") {
    app = sectionManagerPage(subwayDatas);
  } else if (pageName === "map") {
    app = mapPrintManagerPage(subwayDatas);
  }

  return app;
}

import stationManagerPage from "./views/stationManagerPage.js";
import lineManagerPage from "./views/lineManagerPage.js";
import sectionManagerPage from "./views/sectionManagerPage.js";
import mapPrintManagerPage from "./views/mapPrintManagerPage.js";

export default function app(pageName, stationNames) {
  let app = ``;

  // console.log("app", stationNames);

  if (pageName === "station") {
    app = stationManagerPage(stationNames);
  } else if (pageName === "line") {
    app = lineManagerPage();
  } else if (pageName === "section") {
    app = sectionManagerPage();
  } else if (pageName === "map") {
    app = mapPrintManagerPage();
  }

  return app;
}

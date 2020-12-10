import { stationManagerPage } from "./pages/stationPage.js";
import lineManagerPage from "./pages/linePage.js";
import sectionManagerPage from "./pages/sectionPage.js";
import mapPrintManagerPage from "./pages/mapPrintPage.js";

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

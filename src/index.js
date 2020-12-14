import { Constant } from "./util/constant.js";
import { Element, ElementControl } from "./view/element.js";

const App = () => {
  SubwayManager();
};

const SubwayManager = () => {
  Element.stationManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showStationContainer();
  });

  Element.lineManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showLineContainer();
  });

  Element.sectionManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showSectionContainer();
  });

  Element.mapPrintManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showMapPrintContainer();
  });
};

App();

import { Constant } from "./util/constant.js";
import { Element, ElementControl } from "./view/element.js";

const App = () => {
  SubwayManager();
};

const SubwayManager = () => {
  Element.stationManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showStataionManger();
  });

  Element.lineManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showLineManager();
  });

  Element.sectionManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showSectionManager();
  });

  Element.mapPrintManagerButton.addEventListener(Constant.CLICK, () => {
    ElementControl.showMapPrintManager();
  });
};

App();

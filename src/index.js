import { CONSTANT } from "./util/constant.js";
import { element, elementControl } from "./view/element.js";

export default class SubwayManager {
  constructor() {
    this.setEventListener();
  }

  setEventListener() {
    element.stationManagerButton.addEventListener(CONSTANT.CLICK, () => {
      elementControl.showStataionManger();
    });

    element.lineManagerButton.addEventListener(CONSTANT.CLICK, () => {
      elementControl.showLineManager();
    });

    element.sectionManagerButton.addEventListener(CONSTANT.CLICK, () => {
      elementControl.showSectionManager();
    });

    element.mapPrintManagerButton.addEventListener(CONSTANT.CLICK, () => {
      elementControl.showMapPrintManager();
    });
  }
}

new SubwayManager();

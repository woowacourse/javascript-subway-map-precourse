import {
  clearResultDIV,
  isEmptyPage,
  isAlreadyRenderedPage,
} from "./common/function.js";
import { renderInitialLine } from "./containers/line_container.js";
import { renderMapPrint } from "./containers/map_print_container.js";
import { renderSection } from "./containers/section_container.js";
import { renderStation } from "./containers/station_container.js";
import {
  setLineDeleteButtonClickListener,
  setLineAddButtonClickListener,
} from "./managers/line_manager.js";
import { setLineSelectionButtonClickListener } from "./managers/section_manager.js";
import {
  setStationAddButtonClickListener,
  setStationDeleteButtonClickListener,
} from "./managers/station_manager.js";
import { resultDIV, setState } from "./state.js";

const Handler = function () {
  this.onStationButtonClick = () => {
    if (isAlreadyRenderedPage("1")) return;
    clearResultDIV();
    renderStation(resultDIV);
    setStationAddButtonClickListener();
    setStationDeleteButtonClickListener();
    setState("currentPage", "1");
  };

  this.onLineButtonClick = () => {
    if (isAlreadyRenderedPage("2")) return;
    clearResultDIV();
    renderInitialLine(resultDIV);
    setLineDeleteButtonClickListener();
    setLineAddButtonClickListener();
    setState("currentPage", "2");
  };

  this.onSectionButtonClick = () => {
    if (isAlreadyRenderedPage("3")) return;
    clearResultDIV();
    renderSection(resultDIV);
    setLineSelectionButtonClickListener();
    setState("currentPage", "3");
  };

  this.onPrintButtonClick = () => {
    if (isAlreadyRenderedPage("4")) return;
    clearResultDIV();
    renderMapPrint(resultDIV);
    setState("currentPage", "4");
  };
};

export const {
  onStationButtonClick,
  onLineButtonClick,
  onSectionButtonClick,
  onPrintButtonClick,
} = new Handler();

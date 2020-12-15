import {
  clearResultDIV,
  isEmptyPage,
  isAlreadyRenderedPage,
} from "./common/function";
import { renderInitialLine } from "./containers/line_container";
import { renderMapPrint } from "./containers/map_print_container";
import { renderSection } from "./containers/section_container";
import { renderStation } from "./containers/station_container";
import {
  setLineDeleteButtonClickListener,
  setLineAddButtonClickListener,
} from "./managers/line_manager";
import { setLineSelectionButtonClickListener } from "./managers/section_manager";
import {
  setStationAddButtonClickListener,
  setStationDeleteButtonClickListener,
} from "./managers/station_manager";
import { resultDIV, setState } from "./state";

const Handler = function () {
  this.onStationButtonClick = () => {
    if (isEmptyPage() || isAlreadyRenderedPage("1")) return;
    clearResultDIV();
    renderStation(resultDIV);
    setStationAddButtonClickListener();
    setStationDeleteButtonClickListener();
    setState("currentPage", "1");
  };

  this.onLineButtonClick = () => {
    if (isEmptyPage() || isAlreadyRenderedPage("2")) return;
    clearResultDIV();
    renderInitialLine(resultDIV);
    setLineDeleteButtonClickListener();
    setLineAddButtonClickListener();
    setState("currentPage", "2");
  };

  this.onSectionButtonClick = () => {
    if (isEmptyPage() || isAlreadyRenderedPage("3")) return;
    clearResultDIV();
    renderSection(resultDIV);
    setLineSelectionButtonClickListener();
    setState("currentPage", "3");
  };

  this.onPrintButtonClick = () => {
    if (isEmptyPage() || isAlreadyRenderedPage("4")) return;
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

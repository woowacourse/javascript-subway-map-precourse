import { clearResultDIV } from "./common/function";
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
import { resultDIV } from "./state";

const Handler = function () {
  this.onStationButtonClick = () => {
    clearResultDIV();
    renderStation(resultDIV);
    setStationAddButtonClickListener();
    setStationDeleteButtonClickListener();
  };

  this.onLineButtonClick = () => {
    clearResultDIV();
    renderInitialLine(resultDIV);
    setLineDeleteButtonClickListener();
    setLineAddButtonClickListener();
  };

  this.onSectionButtonClick = () => {
    clearResultDIV();
    renderSection(resultDIV);
    setLineSelectionButtonClickListener();
  };

  this.onPrintButtonClick = () => {
    clearResultDIV();
    renderMapPrint(resultDIV);
  };
};

export const {
  onStationButtonClick,
  onLineButtonClick,
  onSectionButtonClick,
  onPrintButtonClick,
} = new Handler();

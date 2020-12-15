import { clearResultDIV } from "./common/function";
import { renderInitialLine } from "./containers/line_container";
import { renderMapPrint } from "./containers/map_print_container";
import { renderStation } from "./containers/station_container";
import {
  setLineDeleteButtonClickListener,
  setLineAddClickListener,
} from "./managers/line_manager";
import {
  setStationAddButtonClickListener,
  setStationDeleteButtonClickListener,
} from "./managers/station_manager";

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
    setLineAddClickListener();
  };
  this.onSectionButtonClick = () => {};
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

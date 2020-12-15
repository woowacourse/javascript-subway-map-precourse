import { clearResultDIV } from "./common/function";
import { renderInitialLine } from "./containers/line_container";
import { renderMapPrint } from "./containers/map_print_container";
import {
  setLineDeleteButtonClickListener,
  setLineAddClickListener,
} from "./managers/line_manager";

const Handler = function () {
  this.onStationButtonClick = () => {};
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

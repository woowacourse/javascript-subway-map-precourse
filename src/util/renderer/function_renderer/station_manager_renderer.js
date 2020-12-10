import FunctionRenderer from './function_renderer.js';
import {
  STATION_MANAGER,
  STATION_MANAGER_ID,
} from '../../../library/constant/constant.js';

export default class StationManagerRenderer extends FunctionRenderer {
  constructor() {
    super(STATION_MANAGER_ID, STATION_MANAGER);
  }

  renderFunctionButton() {
    super.renderFuctionButton();
  }

  renderFunction() {
    // this.renderStationManager();
    // this.renderStationNameInput();
    // this.renderStationNameList();
  }

  renderStationManager() {}

  renderStationNameInput() {}

  renderStationNameList() {}
}

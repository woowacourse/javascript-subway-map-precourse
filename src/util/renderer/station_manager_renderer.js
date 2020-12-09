import FunctionRenderer from './function_renderer.js';
import {
  STATION_MANAGER,
  STAION_MANAGER_BUTTON_ID,
} from '../../library/constant/constant.js';

export default class StationManagerRenderer extends FunctionRenderer {
  constructor() {
    super(STAION_MANAGER_BUTTON_ID, STATION_MANAGER);
  }
}

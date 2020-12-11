import Role from './role.js';
import {
  STATION_MANAGER,
  STATION_MANAGER_BUTTON,
  STATION_MANAGER_K,
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor() {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
  }
}

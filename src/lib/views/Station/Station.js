import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

import {
  STATION_NAME_INPUT_CONTAINER_ID,
  STATION_LIST_VIEW_CONTAINER_ID,
} from "../../common/IdAndClassNames.js";

export default class Station {
  constructor() {
    this.inputContainerId = STATION_NAME_INPUT_CONTAINER_ID;
    this.showStationListContainerId = STATION_LIST_VIEW_CONTAINER_ID;
  }

  render() {
    return `
      <div id="${this.inputContainerId}"></div>
      <div id="${this.showStationListContainerId}"></div>
    `;
  }
}

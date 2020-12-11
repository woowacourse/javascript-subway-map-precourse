import {
  LINE_NAME_INPUT_CONTAINER_ID,
  LINE_INFO_INPUT_CONTAINER_ID,
  LINE_LIST_VIEW_CONTAINER_ID,
} from "../../common/IdAndClassNames.js";

export default class Line {
  constructor() {
    this.lineNameInputContainerId = LINE_NAME_INPUT_CONTAINER_ID;
    this.lineInfoInputContainerId = LINE_INFO_INPUT_CONTAINER_ID;
    this.lineListViewContainerId = LINE_LIST_VIEW_CONTAINER_ID;
  }

  render() {
    return `
      <div id="${this.lineNameInputContainerId}"></div>
      <div id="${this.lineInfoInputContainerId}"></div>
      <div id="${this.lineListViewContainerId}"></div>
    `;
  }
}

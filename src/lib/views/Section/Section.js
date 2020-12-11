import {
  LINE_LIST_VIEW_BUTTONS_CONTAINER_ID,
  SECTION_INFO_INPUT_CONTAINER_ID,
  SECTION_LIST_VIEW_CONTAINER_ID,
} from "../../common/IdAndClassNames.js";

export default class Section {
  constructor() {
    this.lineListViewButtonsContainerId = LINE_LIST_VIEW_BUTTONS_CONTAINER_ID;
    this.sectionInfoInputContainerId = SECTION_INFO_INPUT_CONTAINER_ID;
    this.sectionListViewContainerId = SECTION_LIST_VIEW_CONTAINER_ID;
  }

  render() {
    return `
      <div id = "${this.lineListViewButtonsContainerId}"></div>
      <div id = "${this.sectionInfoInputContainerId}"></div>
      <div id = "${this.sectionListViewContainerId}"></div>
    `;
  }
}

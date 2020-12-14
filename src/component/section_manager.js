import Role from './role.js';
import { roleInterface } from './role_interface.js';
import { sectionValidator } from '../util/validator/section_validator.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import {
  LINES_LS,
  SECTION_ADD_BUTTON,
  SECTION_LINE_MENU_BUTTON,
  SECTION_LINE_TITLE,
  SECTION_MANAGER,
  SECTION_MANAGER_BUTTON,
  SECTION_MANAGER_K,
  SECTION_ORDER_INPUT,
  SECTION_STAION_SELECTOR,
} from '../library/constant/constant.js';

export default class SectionManager extends Role {
  constructor() {
    super(SECTION_MANAGER, SECTION_MANAGER_BUTTON, SECTION_MANAGER_K);
    this.initialize();
    roleInterface.clickButton(SECTION_ADD_BUTTON, this.onClickAddButton, this);
  }

  initialize() {
    roleInterface.renderLineMenuButtons();
    roleInterface.clickButtons(
      SECTION_LINE_MENU_BUTTON,
      roleInterface.onClickLineMenuButton,
      roleInterface
    );
  }

  onClickAddButton() {
    const input = nodeSelector.selectId(SECTION_ORDER_INPUT);
    const selector = nodeSelector.selectId(SECTION_STAION_SELECTOR);
    const lineTitle = nodeSelector.selectId(SECTION_LINE_TITLE);
    const line = lineTitle.innerHTML.split(' ')[0];

    if (
      sectionValidator.checkValidInput(input, line) &&
      sectionValidator.checkValidOption(selector, line)
    ) {
      this.addSection(input, selector, line);
      roleInterface.renderSectionLine(line);
    }
  }

  addSection(input, selector, line) {
    const index = input.value;
    const station = selector.value;
    const lineInfos = roleInterface.getLineInfos();

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      lineInfo.hasOwnProperty(line) && lineInfo[line].splice(index, 0, station);
    }
    localStorage.setItem(LINES_LS, JSON.stringify(lineInfos));
  }
}

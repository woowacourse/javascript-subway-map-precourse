import Role from './role.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
  STATIONS_LS,
  NONE_K,
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
  LINE_ADD_BUTTON,
  LINE_NAME_INPUT,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import LineValidator from '../util/validator/line_validator.js';

export default class LineManager extends Role {
  constructor(lines) {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = lines;
    // this.renderLines();
    this.initSelectOptions();
    this.clickAddButton();
    // this.clickDeleteButton();
  }

  renderLines() {}

  initSelectOptions() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];
    const lineStartSelect = LINE_START_STATION_SELECTOR;
    const lineEndSelect = LINE_END_STATION_SELECTOR;

    if (stations.length == 0) {
      this.renderSelectOption(NONE_K, lineStartSelect, lineEndSelect);

      return;
    }
    stations.forEach(station => {
      this.renderSelectOption(station, lineStartSelect, lineEndSelect);
    });
  }

  clickAddButton() {
    const addButton = nodeSelector.selectId(LINE_ADD_BUTTON);

    addButton.addEventListener('click', this.onClickAddButton.bind(this));
  }

  onClickAddButton() {
    const validator = new LineValidator();
    const lineNameInput = nodeSelector.selectId(LINE_NAME_INPUT);
    const lineStart = nodeSelector.selectId(LINE_START_STATION_SELECTOR);
    const lineEnd = nodeSelector.selectId(LINE_END_STATION_SELECTOR);

    if (
      validator.checkValidInput(lineNameInput) &&
      validator.checkValidOptions(this._lines, lineStart, lineEnd)
    ) {
      this.addLine(lineNameInput, lineStart, lineEnd);
      this.renderLine(lineNameInput, lineStart, lineEnd);
    }
  }

  renderLine(inputs) {}

  addLine(inputs) {}
}

import {
  ACTIVE,
  HIDE,
  LINES_LS,
  NONE_K,
  SELECTORS,
  STATIONS_LS,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';

class RoleInterface {
  // get datas in local storage
  getStations() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];

    return stations;
  }

  getLineInfos() {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];

    return lines;
  }

  // display contents
  displayContent(targetName, status) {
    const target =
      nodeSelector.selectId(targetName) ?? nodeSelector.selectClass(targetName);

    if (!target) {
      return;
    }
    status === ACTIVE && target.classList.remove(HIDE);
    status === HIDE && target.classList.add(HIDE);
  }

  displayContents(targetClass, status) {
    const targets = nodeSelector.selectClassAll(targetClass);

    if (!targets) {
      return;
    }
    targets.forEach(target => {
      status === ACTIVE && target.classList.remove(HIDE);
      status === HIDE && target.classList.add(HIDE);
    });
  }

  // clear
  clearNode(targetId) {
    const target = nodeSelector.selectId(targetId);

    target.innerHTML = '';
  }

  // handle button event
  clickButton(buttonId, onEvent, binder) {
    const button = nodeSelector.selectId(buttonId);

    button.addEventListener('click', onEvent.bind(binder));
  }

  clickButtons(buttonClass, onEvent, binder) {
    const buttons = nodeSelector.selectClassAll(buttonClass);

    buttons.forEach(button => {
      button.addEventListener('click', onEvent.bind(binder));
    });
  }

  // selector renderer
  renderSelectors() {
    SELECTORS.forEach(selectorId => {
      this.clearNode(selectorId);
      this.renderSelectOptions(selectorId);
    });
  }

  renderSelectOptions(selectorId) {
    const selector = nodeSelector.selectId(selectorId);
    const stations = this.getStations();

    if (stations.length === 0) {
      this.renderSelectOption(selector, NONE_K);

      return;
    }
    for (const station of stations) {
      this.renderSelectOption(selector, station);
    }
  }

  renderSelectOption(selector, value) {
    const option = document.createElement('option');

    option.value = value;
    option.append(value);
    selector.append(option);
  }

  // table contents getter
  getRow(className, headerClass) {
    const tableHeaders = nodeSelector.selectClassAll(headerClass);
    const row = document.createElement('tr');
    const blank = document.createElement('td');
    let columnLength = tableHeaders.length;

    row.className = className;
    while (columnLength--) {
      row.append(blank.cloneNode(true));
    }

    return row;
  }

  getButton(className, content) {
    const button = document.createElement('button');

    button.className = className;
    button.append(content);

    return button;
  }
}

export const roleInterface = new RoleInterface();

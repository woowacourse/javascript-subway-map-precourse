import { ID, NAME } from '../constants/index.js';
import { lineManagerTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';

export default class Line {
  constructor($target, $functionButtonContainer) {
    this.createLineManagerButton($functionButtonContainer);
    this.createLineManager($target);
    this.handleLineManagerButton();
  }

  createLineManagerButton($functionButtonContainer) {
    const lineManagerButton = document.createElement('button');

    lineManagerButton.id = ID.LINE_MANAGER_BUTTON;
    lineManagerButton.innerHTML = NAME.LINE_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(lineManagerButton);
  }

  createLineManager($target) {
    const lineManager = document.createElement('div');

    lineManager.id = ID.LINE_MANAGER;
    lineManager.style.display = 'none';
    lineManager.innerHTML = lineManagerTemplate();
    $target.appendChild(lineManager);
  }

  handleLineManagerButton() {
    const lineManagerButton = document.querySelector(`#${ID.LINE_MANAGER_BUTTON}`);

    lineManagerButton.addEventListener('click', () => {
      initialize();
      this.showLineManager();
    });
  }

  showLineManager() {
    const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
    lineManager.style.display = 'block';
  }
}

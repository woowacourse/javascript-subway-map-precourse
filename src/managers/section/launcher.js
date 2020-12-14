import { requestToAddSection } from './adder.js';
import { requestToDeleteSection } from './remover.js';
import { makeTable } from '../../util/util-table.js';
import { getArrayFromLocalStorage } from '../../util/util-local-storage.js';
import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
  appendSelector,
} from '../../util/util-ui.js';

// 3. 구간 관리
export const launchSectionManager = (menu, container) => {
  emptyElement(container);
  createLineMenuUI(menu, container);
};

const createLineMenuUI = (menu, container) => {
  const lineList = getArrayFromLocalStorage('line');
  const lineMenuBar = appendNew('div', container, '', '#line-menu-bar');
  const subContainer = appendNew('div', container, '', '#sub-container');

  appendNew('div', lineMenuBar, '구간을 수정할 노선을 선택해주세요');
  lineList.forEach((line) =>
    appendLineMenuButton(lineMenuBar, subContainer, menu, line)
  );
};

const appendLineMenuButton = (lineMenuBar, subContainer, menu, line) => {
  const button = appendNew(
    'button',
    lineMenuBar,
    line.name,
    null,
    `${menu}-line-menu-button`
  );

  button.addEventListener('click', () =>
    createSectionManagerUI(menu, subContainer, line)
  );
  return button;
};

export const createSectionManagerUI = (menu, subContainer, line) => {
  const form = makeForm(menu);
  const table = makeTable(menu, line);

  emptyElement(subContainer);
  appendNew('h3', subContainer, `🚉${line.name} 관리`);
  appendNew('form', subContainer, form.innerHTML);
  appendNew('button', subContainer, '등록', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAddSection, line);
  appendNew('br', subContainer);
  appendNew('div', subContainer, table.outerHTML, `${line.name}`);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDeleteSection)
    );
};

const makeForm = (menu) => {
  const itemList = getArrayFromLocalStorage('station');
  const form = document.createElement('form');

  appendNew('label', form, '구간 등록');
  appendNew('br', form);
  appendSelector(itemList, form, `${menu}-station-selector`);
  appendNew('input', form, null, `${menu}-order-input`).placeholder = '순서';
  return form;
};

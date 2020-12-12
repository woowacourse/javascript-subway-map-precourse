import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
} from '../../util/util-ui.js';
import { makeTable } from '../../util/util-table.js';
import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';
import { appendSelector } from '../../util/util-selector.js';

// 2. 노선 관리
export const launchLineManager = (menu, container) => {
  emptyElement(container);
  createLineManagerUI(menu, container);
};

const createLineManagerUI = (menu, container) => {
  const table = makeTable(menu);
  let form = appendNew('form', container);

  appendFormComposition(menu, form);
  appendNew('button', container, '노선 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAdd);
  appendNew('br', container);
  appendNew('h2', container, '🚉지하철 노선 목록', `${menu}-list-header`);
  appendNew('div', container, table.outerHTML, `${menu}-list`);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDelete)
    );
};

const appendFormComposition = (menu, form) => {
  appendNew('label', form, '노선 이름', `${menu}-name-header`);
  appendNew('br', form);
  appendNew('input', form, null, `${menu}-name-input`).placeholder =
    '노선 이름을 입력해주세요';
  appendNew('br', form);
  appendSelector(form, 'startStation');
  appendNew('br', form);
  appendSelector(form, 'endStation');
  console.log(form);
};

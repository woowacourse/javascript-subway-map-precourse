import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';
import { makeTable } from '../../util/util-table.js';
import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
  createOption,
  createSelector,
} from '../../util/util-ui.js';
import { getArrayFromLocalStorage } from '../../util/util-local-storage.js';

// 2. 노선 관리
export const launchLineManager = (menu, container) => {
  emptyElement(container);
  createLineManagerUI(menu, container);
};

const createLineManagerUI = (menu, container) => {
  const form = makeForm(menu);
  const table = makeTable(menu);

  appendNew('form', container, form.innerHTML);
  appendNew('button', container, '노선 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAdd);
  appendNew('br', container);
  appendNew('h2', container, '🚉지하철 노선 목록');
  appendNew('div', container, table.outerHTML);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDelete)
    );
};

const makeForm = (menu) => {
  const form = document.createElement('form');

  appendNew('label', form, '노선 이름', `${menu}-name-input-label`);
  appendNew('br', form);
  appendNew('input', form, null, `${menu}-name-input`).placeholder =
    '노선 이름을 입력해주세요';
  appendNew('br', form);
  appendSelector(form, 'start', '상행 종점');
  appendNew('br', form);
  appendSelector(form, 'end', '하행 종점');
  return form;
};

const appendSelector = (form, type, content) => {
  const itemList = getArrayFromLocalStorage('station');
  const options = itemList.map((item) => createOption(item.name));
  const selector = createSelector(
    `${type}Station`,
    `#line-${type}-station-selector`,
    options
  );

  appendNew('label', form, content);
  form.append(selector);
};

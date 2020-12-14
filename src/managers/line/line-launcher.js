import { requestToAddLine } from './line-adder.js';
import { requestToDeleteLine } from './line-remover.js';
import { makeTable } from '../../utils/util-table.js';
import { getArrayFromLocalStorage } from '../../utils/util-local-storage.js';
import {
  appendNew,
  appendSelector,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
} from '../../utils/util-ui.js';

// 2. 노선 관리
export const launchLineManager = (menu, container) => {
  emptyElement(container);
  appendLineManagerUI(menu, container);
};

const appendLineManagerUI = (menu, container) => {
  const form = makeForm(menu);
  const table = makeTable(menu);

  appendNew('form', container, form.innerHTML);
  appendNew('button', container, '노선 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAddLine);
  appendNew('br', container);
  appendNew('h2', container, '🚉 g지하철 노선 목록');
  appendNew('div', container, table.outerHTML);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDeleteLine)
    );
};

const makeForm = (menu) => {
  const options = getArrayFromLocalStorage('station');
  const form = document.createElement('form');

  appendNew('label', form, '노선 이름', `${menu}-name-input-label`);
  appendNew('br', form);
  appendNew('input', form, null, `${menu}-name-input`).placeholder =
    '노선 이름을 입력해주세요';
  appendNew('br', form);
  appendSelector(options, form, `${menu}-start-station-selector`, '상행 종점');
  appendNew('br', form);
  appendSelector(options, form, `${menu}-end-station-selector`, '하행 종점');
  return form;
};

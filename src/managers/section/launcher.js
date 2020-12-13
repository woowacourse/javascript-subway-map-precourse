import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';
import { getArrayFromLocalStorage } from '../../util/util-local-storage.js';
import { makeTable } from '../../util/util-table.js';
import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
  createOption,
  createSelector,
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
  lineList.map((line) => {
    appendNew(
      'button',
      lineMenuBar,
      line.name,
      null,
      '.section-line-menu-button'
    ).addEventListener('click', () =>
      createSectionManagerUI(menu, subContainer, line)
    );
  });
};

const createSectionManagerUI = (menu, subContainer, line) => {
  const form = makeForm(menu, line);
  const table = makeTable(menu);

  emptyElement(subContainer);
  appendNew('h3', subContainer, `🚉${line.name} 관리`);
  appendNew('form', subContainer, form.innerHTML);
  appendNew('button', subContainer, '등록', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAdd);
  appendNew('br', subContainer);
  appendNew('div', subContainer, table.outerHTML);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDelete)
    );
};

const makeForm = (menu, line) => {
  const form = document.createElement('form');

  appendNew('label', form, '구간 등록', `${menu}-name-input-label`);
  appendNew('br', form);
  appendSelector(form, 'section', line);
  appendNew('input', form, null, `${menu}-name-input`).placeholder = '순서';
  return form;
};

const appendSelector = (form, type, line) => {
  const lineList = getArrayFromLocalStorage('line');
  const lineSelected = lineList.filter((v) => v.name === line.name)[0];
  const itemList = lineSelected.stationList;
  const options = itemList.map((item) => createOption(item));
  const selector = createSelector(
    `${type}Station`,
    `#line-${type}-station-selector`,
    options
  );

  appendNew('label', form);
  form.append(selector);
};

import { requestToAddSection } from './section-adder.js';
import { requestToDeleteSection } from './section-remover.js';
import { makeTable } from '../../utils/util-table.js';
import { getArrayFromLocalStorage } from '../../utils/util-local-storage.js';
import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
  appendSelector,
} from '../../utils/util-ui.js';

// 3. 구간 관리
export const launchSectionManager = (menu, container) => {
  emptyElement(container);
  appendSubMenuUI(menu, container);
};

const appendSubMenuUI = (menu, container) => {
  const lineList = getArrayFromLocalStorage('line');
  const subMenuBar = appendNew('div', container, '', '#line-menu-bar');
  const subContainer = appendNew('div', container, '', '#sub-container');

  appendNew('h3', subMenuBar, '구간을 수정할 노선을 선택해주세요');
  lineList.forEach((line) =>
    appendLineMenuButton(subMenuBar, subContainer, menu, line)
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
    appendSectionManagerUI(menu, subContainer, line)
  );
  return button;
};

export const appendSectionManagerUI = (menu, subContainer, line) => {
  const form = makeForm(menu);
  const table = makeTable(menu, line);

  emptyElement(subContainer);
  appendNew('h3', subContainer, `🚉 ${line.name} 관리`);
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

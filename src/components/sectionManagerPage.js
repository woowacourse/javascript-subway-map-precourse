import {
  SECTION_MANAGER_PAGE_MENU_TEMPLATE,
  SECTION_LINE_MENU_BTN,
} from './template/sectionManagerTemplate.js';
import lineStorage from '../utils/lineStorage.js';
import oneSectionManager from './oneSectionManager.js';

export default function sectionManagerPage($element) {
  const lines = lineStorage().getLine();

  $element.innerHTML = SECTION_MANAGER_PAGE_MENU_TEMPLATE;
  const $listMenuBtn = $element.querySelector('.line-buttons');
  $listMenuBtn.innerHTML = lines.map(SECTION_LINE_MENU_BTN).join('');
  const $sectionSelectorContainer = $element.querySelector('#section-selector-container');
  const $sectionTable = $element.querySelector('#section-table');

  const onMenuFilterHandler = (e) => {
    if (!e.target.classList.contains('section-line-menu-button')) {
      return;
    }
    const currentLine = lineStorage().getOneLine(e.target.dataset.lineid);
    oneSectionManager($sectionSelectorContainer, $sectionTable, currentLine);
  };

  $listMenuBtn.addEventListener('click', onMenuFilterHandler);
}

import { makeElement, appendElements } from './utils.js';

export const showModifyLineBtn = subwayMap => {
  const buttonsDiv = document.querySelector('#buttons');
  const emptyDiv = makeElement({
    tag: 'div',
  });
  subwayMap.lineList.forEach(line => {
    const button = makeElement({
      tag: 'button',
      elementClass: '.section-line-menu-button',
      innerHTML: line.name,
      styles: 'margin: 0px 5px 0px 0px',
      dataName: 'line-name',
      dataValue: line.name,
    });
    appendElements([button], emptyDiv);
  });
  buttonsDiv.innerHTML = emptyDiv.outerHTML;
};

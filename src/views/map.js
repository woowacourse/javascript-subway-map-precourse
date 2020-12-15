import { makeElement, appendElements } from './utils.js';

export const showMap = subwayMap => {
  const mapDiv = document.querySelector('.map');
  let mapsHTML = '';
  subwayMap.lineList.forEach(element => {
    const emptyDiv = makeElement({
      tag: 'div',
    });
    const nameH3 = makeElement({
      tag: 'h3',
      innerHTML: element.name,
    });
    const emptyUl = makeElement({
      tag: 'ul',
    });
    element.list.forEach(station => {
      const stationLi = makeElement({
        tag: 'li',
        innerHTML: station,
      });
      appendElements([stationLi], emptyUl);
    });
    appendElements([nameH3, emptyUl], emptyDiv);
    mapsHTML += emptyDiv.outerHTML;
  });
  mapDiv.innerHTML = mapsHTML;
};

import {MAIN, MAP} from '../constants.js';

class SubwayMapView {
  constructor() {
    this.main = document.getElementById(MAIN.ID);
  }

  renderSubwayMap = (lineList) => {
    this.main.innerHTML = `<div class=${MAP.CLASS}></div>`;

    const map = document.getElementsByClassName(MAP.CLASS)[0];

    if (Object.keys(lineList).length === 0) {
      return map.innerHTML = '노선을 먼저 등록해주세요';
    }

    for (const name in lineList) {
      if (name) this.renderLine(map, name, lineList);
    }
  }

  renderLine(map, name, lineList) {
    let section = '';

    lineList[name].forEach((station) => {
      section += `<li>${station.name}</li>`;
    });

    map.innerHTML += `
      <h2>${name}</h2>
      <ul>${section}</ul>
    `;
  }
}

const subwayMapView = new SubwayMapView();

export const {renderSubwayMap} = subwayMapView;

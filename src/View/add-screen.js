import {
  setStationDeleteButton,
  setLineDeleteButton,
  setSectionDeleteButton,
  setSectionLoadButton,
} from './input.js';
import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $subwaySectionContainer,
  $mapContainer,
} from './element.js';

export const addStationScreen = (value) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = document.createElement('tr');
  $stationTr.innerHTML = `
    <td>${value}</td>
    <td><button class="station-delete-button">삭제</button></td>
  `;
  setStationDeleteButton(value, $stationTr.querySelector('button'));
  $stationTbody.appendChild($stationTr);
};

export const addStationSelectOption = ($lastStop, station) => {
  const $optionLastStopStation = document.createElement('option');
  $optionLastStopStation.textContent = station;
  $lastStop.appendChild($optionLastStopStation);
};

export const addLineScreen = (line) => {
  const $lineTbody = $lineContainer.querySelector('table > tbody');
  const $lineTr = document.createElement('tr');
  $lineTr.innerHTML = `
    <td>${line.lineName}</td>
    <td>${line.station[0]}</td>
    <td>${line.station[line.station.length - 1]}</td>
    <td><button class="line-delete-button">삭제</button></td>
  `;
  setLineDeleteButton(line.lineName, $lineTr.querySelector('button'));
  $lineTbody.appendChild($lineTr);
};

export const addSectionButton = (line) => {
  const $sectionButtonContainer = $sectionContainer.querySelector(
    '#section-select-button',
  );
  const $sectionButton = document.createElement('button');
  $sectionButton.className = 'section-line-menu-button';
  $sectionButton.textContent = line;
  setSectionLoadButton(line, $sectionButton);
  $sectionButtonContainer.appendChild($sectionButton);
};

export const addSectionScreen = (line) => {
  const $sectionTbody = $sectionContainer.querySelector('table > tbody');
  for (let i = 0; i < line.station.length; i++) {
    const $sectionTr = document.createElement('tr');
    $sectionTr.innerHTML = `
      <td>${i}</td>
      <td>${line.station[i]}</td>
      <td><button class="section-delete-button">노선에서 삭제</button></td>
    `;
    setSectionTr($sectionTr, line.lineName);
    const sectionData = {line: line.lineName, station: line.station[i]};
    setSectionDeleteButton(sectionData, $sectionTr.querySelector('button'));
    $sectionTbody.appendChild($sectionTr);
  }
};

export const addLineTitle = (line) => {
  const $lineTitle = $subwaySectionContainer.querySelector('h2');
  $lineTitle.textContent = `${line} 관리`;
};

export const addMapPrint = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    const $lineMap = document.createElement('div');
    const $lineTitle = document.createElement('h3');
    const $lineUl = document.createElement('ul');
    $lineTitle.textContent = lines[i].lineName;
    addMapStation($lineUl, lines[i].station);
    $lineMap.appendChild($lineTitle);
    $lineMap.appendChild($lineUl);
    $mapContainer.appendChild($lineMap);
  }
};

const setSectionTr = ($sectionTr, lineName) => {
  $sectionTr.dataset.line = lineName;
  $sectionTr.style.display = 'none';
};

const addMapStation = ($ul, stations) => {
  stations.forEach((station) => {
    const $stationLi = document.createElement('li');
    $stationLi.textContent = station;
    $ul.appendChild($stationLi);
  });
};

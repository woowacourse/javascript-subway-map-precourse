import {
  setStationDeleteButton,
  setLineDeleteButton,
  setSectionDeleteButton,
  setSectionLoadButton,
} from './input.js';
import {
  $stationTbody,
  $lineTbody,
  $sectionEditButtonContainer,
  $sectionTbody,
  $sectionEditContainer,
  $mapContainer,
} from './element.js';
import {TEXT, ADD_BUTTON_CLASS} from '../Controller/constant.js';

const {
  STATION_DELETE,
  LINE_DELETE,
  SECTION_DELETE,
  SECTION_LINE_MENU,
} = ADD_BUTTON_CLASS;

const {DELETE, LINE_MANAGEMENT, DELETE_FROM_LINE} = TEXT;

export const addStationScreen = (stationName) => {
  const $stationTr = document.createElement('tr');
  $stationTr.innerHTML = `
    <td>${stationName}</td>
    <td><button class=${STATION_DELETE}>${DELETE}</button></td>
  `;
  setStationDeleteButton(stationName, $stationTr.querySelector('button'));
  $stationTbody.appendChild($stationTr);
};

export const addSelectorOption = ($selector, stationName) => {
  const $optionLastStopStation = document.createElement('option');
  $optionLastStopStation.textContent = stationName;
  $selector.appendChild($optionLastStopStation);
};

export const addLineScreen = (line) => {
  const $lineTr = document.createElement('tr');
  $lineTr.innerHTML = `
    <td>${line.lineName}</td>
    <td>${line.station[0]}</td>
    <td>${line.station[line.station.length - 1]}</td>
    <td><button class=${LINE_DELETE}>${DELETE}</button></td>
  `;
  setLineDeleteButton(line.lineName, $lineTr.querySelector('button'));
  $lineTbody.appendChild($lineTr);
};

export const addLineTitle = (lineName) => {
  const $lineTitle = $sectionEditContainer.querySelector('h2');
  $lineTitle.textContent = `${lineName} ${LINE_MANAGEMENT}`;
};

export const addSectionScreen = (line) => {
  for (let i = 0; i < line.station.length; i++) {
    const $sectionTr = document.createElement('tr');
    $sectionTr.innerHTML = `
      <td>${i}</td>
      <td>${line.station[i]}</td>
      <td><button class=${SECTION_DELETE}>${DELETE_FROM_LINE}</button></td>
    `;
    setSectionTr($sectionTr, line.lineName);
    const sectionData = {lineName: line.lineName, station: line.station[i]};
    setSectionDeleteButton(sectionData, $sectionTr.querySelector('button'));
    $sectionTbody.appendChild($sectionTr);
  }
};

const setSectionTr = ($sectionTr, lineName) => {
  $sectionTr.dataset.lineName = lineName;
  $sectionTr.style.display = 'none';
};

export const addSectionButton = (lineName) => {
  const $sectionButton = document.createElement('button');
  $sectionButton.className = SECTION_LINE_MENU;
  $sectionButton.textContent = lineName;
  setSectionLoadButton(lineName, $sectionButton);
  $sectionEditButtonContainer.appendChild($sectionButton);
};

export const addMapPrint = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    const $lineMap = document.createElement('div');
    const $lineTitle = document.createElement('h3');
    const $lineUl = document.createElement('ul');
    $lineMap.dataset.lineName = lines[i].lineName;
    $lineTitle.textContent = lines[i].lineName;
    addMapStation($lineUl, lines[i].station);
    $lineMap.appendChild($lineTitle);
    $lineMap.appendChild($lineUl);
    $mapContainer.appendChild($lineMap);
  }
};

const addMapStation = ($ul, stations) => {
  stations.forEach((stationName) => {
    const $stationLi = document.createElement('li');
    $stationLi.textContent = stationName;
    $ul.appendChild($stationLi);
  });
};

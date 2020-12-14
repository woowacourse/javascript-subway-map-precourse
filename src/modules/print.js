import { getStation } from './station/stationDataHandler.js';
import { getLineName, getSelectedLineData } from './line/lineDataHandler.js';
import { addEventToDeleteSectionBtn } from './event.js';

export const printStations = () => {
  const stations = getStation();
  const tableBody = document.querySelector('#station-list');
  let tableRows = '';
  if (stations.length === 0) {
    return clearTable('#station-list');
  }
  for (let i = 0; i < stations.length; i++) {
    tableRows += `<tr><td>${stations[i]}</td><td><button class="station-delete-button" data-station="${stations[i]}">삭제</button></td></tr>`;
  }
  tableBody.innerHTML = tableRows;
};

export const printLines = () => {
  const lineNames = getLineName();
  const tableBody = document.querySelector('#line-list');
  let tableRows = '';
  if (lineNames.length === 0) {
    return clearTable('#line-list');
  }
  for (let i = 0; i < lineNames.length; i++) {
    let lineData = getSelectedLineData(lineNames[i]);
    const lastIdx = lineData.length - 1;
    tableRows += `<tr><td>${lineNames[i]}</td><td>${lineData[0]}</td><td>${lineData[lastIdx]}</td><td><button class="line-delete-button" data-line="${lineNames[i]}">삭제</button></td></tr>`;
  }
  tableBody.innerHTML = tableRows;
};

export const printSection = (line) => {
  const stations = getSelectedLineData(line);
  const tableBody = document.querySelector('#section-list');
  let tableRows = '';
  if (stations.length === 0) {
    return clearTable('#section-list');
  }
  for (let i = 0; i < stations.length; i++) {
    tableRows += `<tr><td>${i}</td><td>${stations[i]}</td><td><button class="section-delete-button" data-station="${stations[i]}">노선에서 제거</button></td></tr>`;
  }
  tableBody.innerHTML = tableRows;
  addEventToDeleteSectionBtn();
};

const clearTable = (bodyId) => {
  const tableBody = document.querySelector(bodyId);
  tableBody.innerHTML = '';
};

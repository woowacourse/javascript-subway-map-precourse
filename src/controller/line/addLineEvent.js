import render from '../../render/render.js';

const MINIMUN_LINE_LENGTH = 2;

function checkDuplicateStation() {
  const startStation = document.querySelector('#line-start-station-selector')
    .value;
  const endStation = document.querySelector('#line-end-station-selector').value;

  if (startStation === endStation) {
    return false;
  }
  return true;
}

function checkDuplicateLineName(lines, inputLineName) {
  if (lines === null) {
    return true;
  }

  const lineNames = lines.split(',').map((line) => line.split(' ')[0]);
  if (lineNames.includes(inputLineName)) {
    return false;
  }
  return true;
}

function checkValidNameLength(inputLineName) {
  if (inputLineName.length < MINIMUN_LINE_LENGTH) {
    return false;
  }
  return true;
}

function addLine(lines, inputLineName) {
  const startStation = document.querySelector('#line-start-station-selector')
    .value;
  const endStation = document.querySelector('#line-end-station-selector').value;
  if (!lines) {
    return localStorage.setItem(
      'lines',
      JSON.stringify(`${inputLineName} ${startStation} ${endStation}`),
    );
  }
  return localStorage.setItem(
    'lines',
    JSON.stringify(`${lines},${inputLineName} ${startStation} ${endStation}`),
  );
}

function checkValidInput(inputLineName) {
  const lines = JSON.parse(localStorage.getItem('lines'));

  if (!checkValidNameLength(inputLineName)) {
    return alert(`노선 이름은 ${MINIMUN_LINE_LENGTH}글자 이상이어야 합니다.`);
  }
  if (!checkDuplicateLineName(lines, inputLineName)) {
    return alert('이미 존재하는 노선 이름은 입력할 수 없습니다.');
  }
  if (!checkDuplicateStation()) {
    return alert('상행 종점과 하행 종점은 다른 역을 선택해야 합니다.');
  }
  return addLine(lines, inputLineName);
}

function getLineName() {
  const inputLineName = document.querySelector('#line-name-input').value.trim();

  if (inputLineName.includes(' ')) {
    return alert('노선 이름에는 공백이 포함될 수 없습니다.');
  }
  if (inputLineName.includes(',')) {
    return alert('노선 이름에는 쉼표가 포함될 수 없습니다.');
  }
  return checkValidInput(inputLineName);
}

export default function addLineEvent() {
  const $lineAddButton = document.querySelector('#line-add-button');

  $lineAddButton.addEventListener('click', () => {
    getLineName();
    render();
  });
}

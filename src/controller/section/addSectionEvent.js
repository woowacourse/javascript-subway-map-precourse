import renderSectionContainer from '../../render/section/renderSectionContainer.js';

function updateSectionList(lineNumber) {
  renderSectionContainer();

  const $sectionContainer = document.querySelectorAll('.section-container');
  $sectionContainer.forEach((container) => {
    if (container.dataset.number === lineNumber) {
      container.removeAttribute('hidden');
    }
  });
}

function addSection(targetLine, lineNumber) {
  const lineList = JSON.parse(localStorage.getItem('lines')).split(',');

  lineList[lineNumber] = targetLine.join(' ');
  localStorage.setItem('lines', JSON.stringify(lineList.join(',')));
  updateSectionList(lineNumber);
}

function checkSectionInput({ target }) {
  const selectedStation = target.parentNode.querySelector('select').value;
  const inputPosition = target.parentNode.querySelector('input').value;
  const targetLine = JSON.parse(localStorage.getItem('lines'))
    .split(',')
    [target.dataset.number].split(' ');

  if (targetLine.slice(1).includes(selectedStation)) {
    return alert('이미 노선에 존재하는 역은 등록할 수 없습니다.');
  }
  targetLine.splice(inputPosition + 1, 0, selectedStation);
  return addSection(targetLine, target.dataset.number);
}

export default function addSectionEvent() {
  const $sectionAddButton = document.querySelectorAll('#section-add-button');

  $sectionAddButton.forEach((button) => {
    button.addEventListener('click', checkSectionInput);
  });
}

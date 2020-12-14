import updateSectionList from './updateSectionList.js';

function addSection(targetLine, lineNumber) {
  console.log(targetLine);
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
  if (inputPosition < 0 || inputPosition > targetLine.length - 1) {
    return alert('해당 순서에는 역을 추가할 수 없습니다.');
  }
  targetLine.splice(Number(inputPosition) + 1, 0, selectedStation);
  return addSection(targetLine, target.dataset.number);
}

export default function addSectionEvent() {
  const $sectionAddButton = document.querySelectorAll('#section-add-button');

  $sectionAddButton.forEach((button) => {
    button.addEventListener('click', checkSectionInput);
  });
}

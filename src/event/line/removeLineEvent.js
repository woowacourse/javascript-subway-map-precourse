import renderLineList from '../../render/line/renderLineList.js';

function removeLine(lineName) {
  const lines = JSON.parse(localStorage.getItem('lines'));
  const lineList = lines.split(',');

  localStorage.setItem(
    'lines',
    JSON.stringify(
      lineList.filter((line) => line.split(' ')[0] !== lineName).join(','),
    ),
  );
  if (lineList.length === 1) {
    localStorage.removeItem('lines');
  }
  renderLineList();
}

function findRemoveTarget(target) {
  const $lineTable = document.querySelectorAll('.line-table-child');
  const targetNumber = target.closest('td').dataset.number;

  removeLine($lineTable[targetNumber].querySelector('td').innerText);
}

export default function removeLineEvent() {
  const $lineDeleteButton = document.querySelectorAll('.line-delete-button');

  $lineDeleteButton.forEach((button) =>
    button.addEventListener('click', ({ target }) => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        findRemoveTarget(target);
      }
    }),
  );
}

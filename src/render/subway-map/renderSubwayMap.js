function lineInfoTemplate(lineInfo) {
  return lineInfo.map((line) => `<li>${line}</li>`).join('');
}

function lineNameTemplate(lineName, lineInfo) {
  return `<h3>${lineName}</h3>
          <ul>
            ${lineInfoTemplate(lineInfo)}
          </ul>`;
}

function renderLines(lineList, $mapPrintPage) {
  lineList.forEach((line) => {
    const lineName = line.split(' ')[0];
    const lineInfo = line.split(' ').splice(1);

    $mapPrintPage.insertAdjacentHTML(
      'beforeend',
      lineNameTemplate(lineName, lineInfo),
    );
  });
}

export default function renderSubwayMap() {
  const lines = JSON.parse(localStorage.getItem('lines'));
  const $mapPrintPage = document.querySelector('.map-print-page');

  if (lines === null) {
    return ($mapPrintPage.innerHTML = `<h3>현재 등록된 노선이 없습니다.</h3>`);
  }
  $mapPrintPage.innerHTML = '';
  return renderLines(lines.split(','), $mapPrintPage);
}

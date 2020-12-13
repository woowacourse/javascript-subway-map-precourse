function selectButtonTemplate(line, lineNumber) {
  return `<button class="line-select-button" data-number=${lineNumber}>
            ${line}
          </button>&nbsp`;
}

function getLineNames(lines) {
  return lines.split(',').map((line) => line.split(' ')[0]);
}

function renderSelectButton(lines, $lineSelectContainer) {
  const lineNames = getLineNames(lines);
  let lineNumber = 0;

  lineNames.forEach((line) => {
    $lineSelectContainer.insertAdjacentHTML(
      'beforeend',
      selectButtonTemplate(line, lineNumber++),
    );
  });
}

export default function renderLineSelector() {
  const $lineSelectContainer = document.querySelector('.line-select-container');
  const lines = JSON.parse(localStorage.getItem('lines'));

  if (lines === null) {
    return ($lineSelectContainer.innerHTML = `<strong>현재 등록된 노선이 없습니다.</strong>`);
  }
  $lineSelectContainer.innerHTML = '';
  return renderSelectButton(lines, $lineSelectContainer);
}

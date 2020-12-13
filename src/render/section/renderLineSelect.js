function selectButtonTemplate(line) {
  return `<button>
            ${line}
          </button>&nbsp`;
}

function getLineNames(lines) {
  return lines.split(',').map((line) => line.split(' ')[0]);
}

function renderSelectButton(lines, $lineSelectContainer) {
  const lineNames = getLineNames(lines);

  lineNames.forEach((line) => {
    $lineSelectContainer.insertAdjacentHTML(
      'beforeend',
      selectButtonTemplate(line),
    );
  });
}

export default function renderLineSelector() {
  const $lineSelectContainer = document.querySelector('.line-select-container');
  const lines = JSON.parse(localStorage.getItem('lines'));

  if (lines === null) {
    return ($lineSelectContainer.innerHTML = `<strong>현재 등록된 노선이 없습니다.</strong>`);
  }
  return renderSelectButton(lines, $lineSelectContainer);
}

// <div class="section-select-container">
//   <button>temp 1</button>
//   <button>temp 2</button>
//   <button>temp 3</button>
// </div>;

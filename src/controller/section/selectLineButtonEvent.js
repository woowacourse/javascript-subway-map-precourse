function viewSelectedLine(lineNumber) {
  const $sectionContainer = document.querySelectorAll('.section-container');

  $sectionContainer.forEach((container) => {
    if (container.dataset.number === lineNumber) {
      return container.removeAttribute('hidden');
    }
    return container.setAttribute('hidden', true);
  });
}

export default function selectLineEvent() {
  const $lineSelectButton = document.querySelectorAll('.line-select-button');

  $lineSelectButton.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
      viewSelectedLine(target.dataset.number);
    });
  });
}

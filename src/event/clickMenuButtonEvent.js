function changeManagerContainer({ target }) {
  if (target.id === 'station-manager-button') {
    document.querySelector('.station-manager-page').removeAttribute('hidden');
  }
}

export default function clickMenuButtonEvent() {
  const $menuButton = document.querySelector('.menu');

  $menuButton.addEventListener('click', changeManagerContainer);
}

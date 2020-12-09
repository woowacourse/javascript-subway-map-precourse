function changeManagerContainer({ target }) {
  console.log(target.id);
}

export default function addMenuButtonEvent() {
  const $menuButton = document.querySelector('.menu');

  $menuButton.addEventListener('click', changeManagerContainer);
}

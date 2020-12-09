function pageSection() {
  return `<div class="management-container"></div>`;
}

export default function addSubwayMangageContainer() {
  const $app = document.querySelector('#app');

  $app.insertAdjacentHTML('beforeend', pageSection());
}

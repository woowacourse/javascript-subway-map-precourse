function lineManagementPage() {
  return `<div hidden>Line Manger Page</div>`;
}

export default function initLineManagertPage() {
  const $managementContainer = document.querySelector('.manager-container');

  $managementContainer.insertAdjacentHTML('beforeend', lineManagementPage());
}

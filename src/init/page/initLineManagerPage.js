function lineManagementPage() {
  return `<div hidden>Line Manger Page</div>`;
}

export default function initLineManagertPage() {
  const $managementContainer = document.querySelector('.management-container');

  $managementContainer.insertAdjacentHTML('beforeend', lineManagementPage());
}

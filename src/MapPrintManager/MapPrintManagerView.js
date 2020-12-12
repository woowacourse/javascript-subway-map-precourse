export default class MapPrintManagerView {
  static view() {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    document.getElementById('sub-view-container').innerHTML = `
    ${Object.keys(lines).map((line) => `<div class="map">
      <h3>${line}</h3>
      <ul>
        ${lines[line].map((station) => `<li>${station}</li>`).join('')}
      </ul>`).join('')}
    </div>
    `;
  }
}

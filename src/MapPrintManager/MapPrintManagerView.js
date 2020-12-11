export default class MapPrintManagerView {
  static view() {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    document.getElementById('sub-view-container').innerHTML = `
    ${Object.keys(lines).map((line) => `
    <h3>${line}</h3>
    <ul>
      <li>${lines[line][0]}</li>
      <li>${lines[line][(lines[line].length - 1)]}</li>
    </ul>`).join('')}
    `;
  }
}

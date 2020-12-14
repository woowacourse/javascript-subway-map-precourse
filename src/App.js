export default class App {
  constructor(target) {
    this._target = target;
    this.createButtons(target);
  }

  createButtons(target) {
    const _ul = document.createElement('ul');
    _ul.className = 'navigation';
    const buttons = [
      { id: 'station-manager-button', label: '1. 역 관리' },
      { id: 'line-manager-button', label: '2. 노선 관리' },
      { id: 'section-manager-button', label: '3. 구간 관리' },
      { id: 'map-print-manager-button', label: '4. 지하철 노선도 출력' },
    ];
    _ul.innerHTML = `
      ${buttons.map(({ id, label }) => `
        <li><button id=${id}>${label}</button></li>
      `).join('')}
    `;
    target.appendChild(_ul);
  }
}

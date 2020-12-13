import Component from '../../library/core/component.js';
import LineSectionManager from './line-section-manager/index.js';

class SectionManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요</h3>
      <nav id="line-selector">
        ${this.createLineSelectButtonsTemplate()}
      </nav>
      <div id="line-section-manager"></div>
    `;
  }

  createLineSelectButtonsTemplate() {
    return this._props.lines.value
      .map(line => this.createLineSelectButtonTemplate(line))
      .join('');
  }

  createLineSelectButtonTemplate(line) {
    return `
      <button class="section-line-menu-button" data-key="${line.lineName}">
        ${line.lineName}
      </button>
    `;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.classList.contains('section-line-menu-button')) {
        this.mountLineSectionManagerComponent(event.target.dataset.key);
      }
    });
  }

  mountLineSectionManagerComponent(targetLineName) {
    const $lineSectionManager = this._$target.querySelector(
      '#line-section-manager'
    );
    const { lines, stations } = this._props;
    new LineSectionManager($lineSectionManager, {
      stations,
      lines,
      targetLineName,
    });
  }
}

export default SectionManager;

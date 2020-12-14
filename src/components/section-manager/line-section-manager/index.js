import Component from '../../../library/core/component.js';
import SectionInput from './section-input.js';
import SectionList from './section-list.js';

class LineSectionManager extends Component {
  #targetLine;

  constructor($target, props) {
    super($target, props);
    this.initializeStates();
    this.render();
  }

  initializeStates() {
    const { targetLineName, lines } = this._props;
    this.#targetLine = lines.value.find(
      line => line.lineName === targetLineName
    );
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <h3>${this._props.targetLineName} 관리</h3>
      <div id="section-input"></div>
      <div id="section-list"></div>
    `;
  }

  mountComponents() {
    const $sectionInput = this._$target.querySelector('#section-input');
    const $sectionList = this._$target.querySelector('#section-list');
    const { stations, lines } = this._props;
    const targetLine = this.#targetLine;
    new SectionInput($sectionInput, { stations, lines, targetLine });
    new SectionList($sectionList, { lines, targetLine });
  }
}

export default LineSectionManager;

import Component from '../../../library/core/component.js';
import SectionInput from './section-input.js';
import SectionList from './section-list.js';

class LineSectionManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
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
    const { stations, lines, targetLineName } = this._props;
    new SectionInput($sectionInput, { stations });
    new SectionList($sectionList, { lines, targetLineName });
  }
}

export default LineSectionManager;

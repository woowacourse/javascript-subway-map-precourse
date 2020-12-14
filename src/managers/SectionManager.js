import Component from '../factory/Component.js';
import { SECTION_SELECTOR } from '../share/selector.js';
import SectionDetailManager from './SectionDetailManager.js';

export default class SectionManager extends Component {
  constructor(props) {
    super(props);

    this.sectionLineMenu = this.container.querySelector(
      `#${SECTION_SELECTOR.LINE_MENU_ID}`,
    );
    this.sectionDetailManager = new SectionDetailManager({
      containerId: SECTION_SELECTOR.DETAIL_CONTAINER_ID,
      syncData: this.props.syncData,
    });

    this.sectionLineMenu.addEventListener(
      'click',
      this.changeSectionDetailManger,
    );

    this.sectionDetailManager.hide();
  }

  changeSectionDetailManger = (e) => {
    const { name: selectedLineName } = e.target.dataset;
    this.sectionDetailManager.setState({
      currentLineData: this.getSelectedLine(selectedLineName),
    });
    this.sectionDetailManager.show();
  };

  getSelectedLine = (name) =>
    this.state.lineList.find((line) => line.name === name);

  template() {
    return this.state.lineList
      .map((line) => `<button data-name="${line.name}">${line.name}</button>`)
      .join('');
  }

  render() {
    this.sectionLineMenu.innerHTML = this.template();
  }
}

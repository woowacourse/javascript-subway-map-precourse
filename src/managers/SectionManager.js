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

    this.sectionDetailManager.hide();
  }

  template() {
    return this.state.lineList
      .map((line) => `<button>${line.name}호선</button>`)
      .join('');
  }

  render() {
    this.sectionLineMenu.innerHTML = this.template();
  }
}

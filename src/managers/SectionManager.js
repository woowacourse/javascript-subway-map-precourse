import Component from '../factory/Component.js';
import SectionDetailManager from './SectionDetailManager.js';
import { SECTION_SELECTOR } from '../share/selector.js';
import { isEmpty } from '../share/utils.js';

export default class SectionManager extends Component {
  constructor(props) {
    super(props);

    this.sectionLineMenu = this.container.querySelector(
      `#${SECTION_SELECTOR.LINE_MENU_ID}`,
    );
    this.sectionDetailManager = new SectionDetailManager({
      containerId: SECTION_SELECTOR.DETAIL_CONTAINER_ID,
      syncData: this.syncData,
    });

    this.sectionLineMenu.addEventListener('click', this.changeSectionDetailManger);

    this.sectionDetailManager.hide();
  }

  changeSectionDetailManger = (event) => {
    if (event.target.nodeName !== 'BUTTON') return;
    const { name: selectedLineName } = event.target.dataset;
    const newData = {
      ...this.data,
      currentLineData:
      this.getSelectedLine(selectedLineName),
    };
    this.syncData(newData);
    this.sectionDetailManager.show();
  };

  getSelectedLine = (name) => this.data.lineList.find((line) => line.name === name);

  updateMenuList() {
    this.sectionLineMenu.innerHTML = this.data.lineList
      .map((line) => `<button data-name="${line.name}">${line.name}</button>`)
      .join('');
  }

  hideDetailManager() {
    if (isEmpty(this.data.lineList)) {
      this.sectionDetailManager.hide();
    }
  }

  render() {
    this.hideDetailManager();
    this.updateMenuList();
  }
}

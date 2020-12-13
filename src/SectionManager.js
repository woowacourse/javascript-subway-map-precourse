import Component from "./Component.js";
import {
  createButtonHTMLElement,
  createDivHTMLElement,
  getLineNameArray
} from "./util.js";

export default class SectionManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.declareConstants();
    this.initializeVariables();

    this.constructHTMLElements();
    this.appendChildNodes();

    if (this.lineNameArray.length > 0) {
      this.render();
    }
  }
  
  declareConstants() {
    this.SECTION_LINE_MENU_BUTTON_CLASSNAME = "section-line-menu-button";
  }

  initializeVariables() {
    this.lineNameArray = getLineNameArray().sort(); // 노선 이름을 사전 순으로 정렬
  }

  constructHTMLElements() {
    this.$sectionLineMenu = createDivHTMLElement({});
  }

  appendChildNodes() {
    this.$component.append(this.$sectionLineMenu);    
  }

  render() {
    this.$sectionLineMenu.innerHTML = "<div>구간을 수정할 노선을 선택해주세요.</div>";
    this.$childNodes = this.lineNameArray.reduce((acc, lineName) => {
      const $menuButton = createButtonHTMLElement({
        classList: [this.SECTION_LINE_MENU_BUTTON_CLASSNAME],
        name: lineName
      });

      return [...acc, $menuButton];
    }, []);

    this.$sectionLineMenu.append(...this.$childNodes);
  }
}
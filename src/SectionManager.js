import Component from "./Component.js";
import SectionMain from "./SectionMain.js";
import {
  createButtonHTMLElement,
  createDivHTMLElement,
  getLineNameArray
} from "./util.js";

/*
  StationManager가 관리하는 상태값은 구간을 관리하고자 하는 노선 이름이다.
  사용자가 지하철 노선을 선택하기 전에는 선택된 노선 이름이 없다.
*/
export default class SectionManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.declareConstants();
    this.initializeState();
    this.initializeVariables();

    this.constructHTMLElements();
    this.appendChildNodes();

    this.addClickEventListener();

    this.render();
  }
  
  declareConstants() {
    this.SECTION_LINE_MENU_BUTTON_CLASSNAME = "section-line-menu-button";
  }

  initializeState() {
    this.state = {};
  }

  initializeVariables() {
    this.lineNameArray = getLineNameArray().sort(); // 노선 이름을 사전 순으로 정렬
  }

  constructHTMLElements() {
    this.$sectionLineMenu = this.createSectionLineMenu();
    
    this.$sectionMain = createDivHTMLElement({});
  }

  createSectionLineMenu() {
    const $sectionLineMenu = createDivHTMLElement({});    

    if (this.lineNameArray.length === 0) {
      const $noLineMessage = createDivHTMLElement({ innerText: "등록된 지하철 노선이 없습니다." });      
      $sectionLineMenu.append($noLineMessage);
    } else {
      const $sectionLineMenuLabel = createDivHTMLElement({ innerText: "구간을 수정할 노선을 선택해주세요." });
      const $sectionLineMenuButtonArray = this.createSectionLineMenuButtonArray();
      
      $sectionLineMenu.append($sectionLineMenuLabel, ...$sectionLineMenuButtonArray);
    }

    return $sectionLineMenu;
  }

  createSectionLineMenuButtonArray() {
    return this.lineNameArray.reduce((acc, lineName) => {
      const $sectionLineMenuButton = this.createSectionLineMenuButton({ lineName });
      
      return [...acc, $sectionLineMenuButton];
    }, []);
  }

  createSectionLineMenuButton({lineName}) {
    return createButtonHTMLElement({
      classList: [this.SECTION_LINE_MENU_BUTTON_CLASSNAME],
      name: lineName,
      dataset: { lineName }
    });
  }

  appendChildNodes() {
    this.$component.append(this.$sectionLineMenu, this.$sectionMain);    
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { classList } } = e;
      const { target: { dataset: { lineName } } } = e;

      if (classList.contains(this.SECTION_LINE_MENU_BUTTON_CLASSNAME)) {
        this.handleLineMenuButton(lineName);
      }
    });
  }

  handleLineMenuButton(lineName) {   
    this.setState({ lineName });
  }

  render() {
    const { lineName } = this.state;
    if (lineName) {
      this.$sectionMain.innerHTML = "";
      new SectionMain({ $parent: this.$sectionMain, lineName });
    }
  }
}
import Component from "./Component.js";
import { classname } from "./constant.js";
import SectionMain from "./SectionMain.js";
import {
  createHTMLElement,
  createButtonHTMLElement,
  createDivHTMLElement
} from "./util.js";

/*
  SectionManager가 관리하는 상태값은 아래와 같다.
  state: {
  lineName: string //구간을 관리하고자 하는 노선 이름
  }
   
  사용자가 지하철 노선을 선택하기 전에는 선택된 노선 이름은 공백문자이다.
*/
export default class SectionManager extends Component {
  /* 
    props: { 
      $parent, 
      stationNameArray,  // 등록된 모든 지하철 역 이름들
      lineInfo,          // 등록된 모든 지하철 노선 정보
      initialLineName,   // 현재 선택된 지하철 노선 이름의 초기값
      setLineInfo,       // 지하철 노선 정보를 App.js의 상태값으로 등록하는 함수
      setSectionLineName // 선택된 지하철 노선이 업데이트되면 
                         // 이를 App.js의 상태값으로 등록하는 함수
    }
 */
  constructor(props) {
    super(props);
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
    const { initialLineName } = this.props;

    this.state = {
      lineName: initialLineName
    };
  }

  initializeVariables() {
    const { lineInfo } = this.props;

    this.lineNameArray = lineInfo.map(({ lineName }) => lineName); // 노선 이름은 이미 사전 순으로 정렬되어 있음
  }

  constructHTMLElements() {
    this.$sectionLineMenuLabel = createHTMLElement({
      tagname: "h3",
      innerText: this.lineNameArray.length === 0 ? "등록된 지하철 노선이 없습니다." : "구간을 수정할 노선을 선택해주세요."
    });

    this.$sectionLineMenu = createDivHTMLElement({classList: ["section-line-menu"]});
    this.$sectionLineMenuButtonArray = this.createSectionLineMenuButtonArray();
    
    this.$sectionMain = createDivHTMLElement({});
  }
  
  createSectionLineMenuButtonArray() {
    return this.lineNameArray.reduce((acc, lineName) => {
      const $sectionLineMenuButton = this.createSectionLineMenuButton({ lineName });
      
      return [...acc, $sectionLineMenuButton];
    }, []);
  }

  createSectionLineMenuButton({lineName}) {
    return createButtonHTMLElement({
      classList: [
        this.SECTION_LINE_MENU_BUTTON_CLASSNAME,
        classname.MEDIUM_BUTTON,
        classname.CENTER
      ],
      name: lineName,
      dataset: { lineName }
    });
  }

  appendChildNodes() {
    this.$component.append(
      this.$sectionLineMenuLabel,
      this.$sectionLineMenu,
      this.$sectionMain
    );

    this.$sectionLineMenu.append(...this.$sectionLineMenuButtonArray);
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { classList } } = e;
      const { target: { dataset: { lineName } } } = e;
      const { lineName: currentLineName } = this.state;

      if (lineName !== currentLineName &&
        classList.contains(this.SECTION_LINE_MENU_BUTTON_CLASSNAME)) {
        this.handleLineMenuButton(lineName);
      }
    });
  }

  handleLineMenuButton(lineName) {   
    this.setState({ lineName });
  }

  setState(state) {
    super.setState(state);

    const { lineName } = this.state;
    const { setSectionLineName } = this.props;

    setSectionLineName(lineName);
  }

  render() {
    const { lineName } = this.state;
    if (lineName) {
      this.renderSectionMain();
    }
  }

  renderSectionMain() {
    const { lineName } = this.state;
    const { stationNameArray, lineInfo } = this.props;

    this.$sectionMain.innerHTML = "";
    new SectionMain({
      $parent: this.$sectionMain,
      lineName,
      initialStations: this.getStations(lineName),
      stationNameArray,
      lineInfo,
      setStations: stations => this.setStations(stations)
    });
  }

  getStations(targetLineName) {
    const { lineInfo } = this.props;

    return lineInfo.find(({ lineName }) => lineName === targetLineName).stations;
  }

  setStations(stations) {
    const { lineInfo, setLineInfo } = this.props;
    const { lineName } = this.state;

    const targetExcludedLineInfo = lineInfo.filter(({ lineName: oldLineName }) => oldLineName !== lineName);
    const updatedLineInfo = [...targetExcludedLineInfo, { lineName, stations }];

    setLineInfo(updatedLineInfo);
  }
}
import Component from "./Component.js";
import StationManager from "./StationManager.js";
import LineManager from "./LineManager.js";
import SectionManager from "./SectionManager.js";
import MapPrintManager from "./MapPrintManager.js";
import {
  createButtonHTMLElement,
  createHTMLElement,
  retrieveState,
  storeState
} from "./util.js";
import { classname } from "./constant.js";

/* 
  App.js이 관리하는 상태값은 아래와 같다.
  state: {
    managerId: string,          // `역 관리`, `노선 관리`, `구간 관리`, `지하철 노선도 출력` 구분 id
    stationNameArray: [string], // 등록된 모든 지하철 역 이름
    lineInfo: [ 
      {
      lineName: string,         // 지하철 노선 이름
      stations: [string]        // 해당 지하철 노선에 속한 `지하철 역이름들`
      }
    ],
    sectionLineName: string     // `구간 관리`에서 선택된 `지하철 노선 이름`
  }
*/
export default class App extends Component{
  constructor({ $parent }) {
    super( {$parent });
    this.declareConstants();
    this.intializeState();
    
    this.constructHTMLElements();
    this.appendChildNodes();
    
    this.addClickEventListener();

    this.render();
  }

  declareConstants() {
    this.STATION_MANAGER_BUTTON_ID = "station-manager-button";
    this.LINE_MANAGER_BUTTON_ID = "line-manager-button";
    this.SECTION_MANAGER_BUTTON_ID = "section-manager-button";
    this.MAP_PRINT_MANAGER_BUTTON_ID = "map-print-manager-button";

    this.MANAGER_BUTTON_ID_ARRAY = [
      this.STATION_MANAGER_BUTTON_ID,
      this.LINE_MANAGER_BUTTON_ID,
      this.SECTION_MANAGER_BUTTON_ID,
      this.MAP_PRINT_MANAGER_BUTTON_ID
    ];
  }

  intializeState() {
    this.state = retrieveState() || {
      managerId: "",
      stationNameArray: [],
      lineInfo: [],
      sectionLineName: ""
    };
  }

  constructHTMLElements() {
    this.$nav = this.createNav();
    this.$main = document.createElement("main");
  }

  createNav() {
    const $nav = createHTMLElement({ tagname: "nav", classList: ["subway-map-button-nav"] });
    const $navButtonArray = this.createNavButtonArray();
    $nav.append(...$navButtonArray);

    return $nav;
  }

  createNavButtonArray() {
    const $stationManagerButton = this.createStationManagerButton();
    const $lineManagerButton = this.createLineManagerButton();
    const $sectionManagerButton = this.createSectionManagerButton();
    const $mapPrintManagerButton = this.createMapPrintManagerButton();

    return [
      $stationManagerButton,
      $lineManagerButton,
      $sectionManagerButton,
      $mapPrintManagerButton
    ];
  }

  createStationManagerButton() {
    return createButtonHTMLElement({
      id: this.STATION_MANAGER_BUTTON_ID,
      name: "1. 역 관리", 
      classList: [classname.MEDIUM_BUTTON, classname.CENTER]
    });
  }

  createLineManagerButton() {
    return createButtonHTMLElement({
      id: this.LINE_MANAGER_BUTTON_ID,
      name: "2. 노선 관리",
      classList: [classname.MEDIUM_BUTTON, classname.CENTER]
    });
  }

  createSectionManagerButton() {
    return createButtonHTMLElement({
      id: this.SECTION_MANAGER_BUTTON_ID,
      name: "3. 구간 관리",
      classList: [classname.MEDIUM_BUTTON, classname.CENTER]
    });
  }

  createMapPrintManagerButton() {
    return createButtonHTMLElement({
      id: this.MAP_PRINT_MANAGER_BUTTON_ID,
      name: "4. 지하철 노선도 출력",
      classList: [classname.MEDIUM_BUTTON, classname.CENTER]
    });
  }

  appendChildNodes() {
    this.$component.append(this.$nav, this.$main);
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id } } = e;
      const { managerId } = this.state;

      if (id !== managerId && this.MANAGER_BUTTON_ID_ARRAY.includes(id)) { 
        this.setState({ managerId: id });
      }
    });
  }
  
  setState(state) {
    super.setState(state);
    
    storeState(this.state);
  }

  render() {
    console.log(this.state);
    const { managerId } = this.state;

    this.$main.innerHTML = "";
    if (managerId === this.STATION_MANAGER_BUTTON_ID) {
      this.renderStationManager();
    } else if (managerId === this.LINE_MANAGER_BUTTON_ID) {
      this.renderLineManager();
    } else if (managerId === this.SECTION_MANAGER_BUTTON_ID) {
      this.renderSectionManager();
    } else if (managerId === this.MAP_PRINT_MANAGER_BUTTON_ID) {
      this.renderMapPrintManager();
    }
  }

  renderStationManager() {
    const { stationNameArray, lineInfo } = this.state;

    new StationManager({
      $parent: this.$main,
      initialStationNameArray:stationNameArray,
      lineInfo,
      setStationNameArray: stationNameArray => this.setStationNameArray(stationNameArray)
    });
  }

  setStationNameArray(stationNameArray) {
    this.setState({
      stationNameArray: [...stationNameArray.sort()]
    });
  }

  renderLineManager() {
    const { stationNameArray, lineInfo } = this.state;

    new LineManager({
      $parent: this.$main,
      stationNameArray,
      initialLineInfo: lineInfo,
      setLineInfo: lineInfo => this.setLineInfo(lineInfo),
      deleteSectionLineName: sectionLineName => this.deleteSectionLineName(sectionLineName)
    });
  }

  setLineInfo(lineInfo) {
    const sortedLineInfo = lineInfo.sort(
      ({ lineName: aLineName }, { lineName: bLineName }) => {
        return aLineName < bLineName ? -1 : 1;
      }
    );

    this.setState({
      lineInfo: [...sortedLineInfo]
    });
  }

  deleteSectionLineName(targetLineName) {
    const { sectionLineName } = this.state;

    if (targetLineName === sectionLineName) {
      this.setSectionLineName("");
    }
  }

  renderSectionManager() {
    const { stationNameArray, lineInfo, sectionLineName } = this.state;
    
    new SectionManager({
      $parent: this.$main,
      stationNameArray,
      lineInfo,
      initialLineName: sectionLineName,
      setLineInfo: lineInfo => this.setLineInfo(lineInfo),
      setSectionLineName: sectionLineName => this.setSectionLineName(sectionLineName) 
    });
  }

  setSectionLineName(sectionLineName) {
    this.setState({ sectionLineName });
  }

  renderMapPrintManager() {
    const { lineInfo } = this.state;

    new MapPrintManager({
      $parent: this.$main,
      lineInfo
    });
  }
}
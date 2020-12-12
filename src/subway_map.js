import { nodeSelector } from './util/selector/node_selector.js';
import StationManager from './component/station_manager.js';
import { STATIONS_LS } from './library/constant/constant.js';

export default class SubwayMap {
  constructor() {
    this.roles = [new StationManager()];
    this.loadStations();
  }

  loadStations() {
    const loadedStations = localStorage.getItem(STATIONS_LS);

    if (loadedStations) {
      console.log('hi');
    }
  }

  activate() {
    this.roles.forEach(role => {
      const roleButton = nodeSelector.selectId(role.buttonId);

      roleButton.addEventListener('click', role.display.bind(role));
    });
  }
}

/*
 * 로컬 스토리지에는 두 항목만 존재한다.
 * stations: ['망원', '광흥창', ...];
 * lines: [{1호선: ['인천', '소요산']}, {2호선: [...]}];
 * 호선 데이터를 배열로 저장해놓고, 그 값의 인덱스를 비교해 정렬
 * 한정되어 있기 때문에 해시를 쓴다.
 */

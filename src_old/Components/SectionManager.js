class SectionManager {
  constructor({ $target, stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.mountDOMs();
  }

  mountDOMs() {}
}

export default SectionManager;

// 지하철 노선을 선택하는 button 태그는 .section-line-menu-button class값을 가진다.
// 지하철 구간을 설정할 역 select 태그는 #section-station-selector id값을 가진다.
// 지하철 구간의 순서를 입력하는 input 태그는 #section-order-input id값을 가진다.
// 지하철 구간을 등록하는 button 태그는 #section-add-button id값을 가진다.
// 지하철 구간을 제거하는 button 태그는 .section-delete-button class값을 가진다.

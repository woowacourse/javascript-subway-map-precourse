export default class SubwayMapSectionView {
  constructor(subwayMapViewModel) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
  }

  addEventListenerToSectionManagerButton() {}

  handleSectionManagerButton() {
    this.resetManagerContainer();
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }
}

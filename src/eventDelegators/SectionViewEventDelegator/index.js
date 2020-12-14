import { message } from '../../constants';

export default class SectionViewEventDelegator {
  constructor(subwayMapViewModel) {
    this.sectionView = null;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
  }

  bindSectionView(sectionView) {
    this.sectionView = sectionView;
  }

  onClick(event) {
    const { dataset } = event.target;

    if (dataset.purpose) {
      this[dataset.purpose](dataset);
    }
  }

  sectionManager() {
    this.sectionView.resetManagerContainer();
    this.sectionView.renderSectionManager();
  }

  selectLine(dataset) {
    this.sectionView.resetSelectedLineSectionManagerContainer();
    this.sectionView.renderSelectedLineSectionManager(this.subwayMapViewModel.getLine(dataset.id));
  }

  addSection(dataset) {
    const sectionSelector = this.sectionView.managerContainer.querySelector(
      '#section-station-selector',
    );
    const sectionId = sectionSelector[sectionSelector.selectedIndex].dataset.id;
    const sectionOrder = this.sectionView.managerContainer.querySelector('#section-order-input')
      .value;

    this.subwayMapViewModel.addSection(sectionId, dataset.lineid, sectionOrder);
    this.sectionView.resetSectionTable();
    this.sectionView.renderSectionTable(
      dataset.lineid,
      this.subwayMapViewModel.getSections(dataset.lineid),
    );
  }

  deleteSection(dataset) {
    if (confirm(message.ASK_WANT_TO_DELETE_IN_LINE)) {
      this.subwayMapViewModel.deleteSection(dataset.lineid, dataset.sectionid);
      this.sectionView.resetSectionTable();
      this.sectionView.renderSectionTable(
        dataset.lineid,
        this.subwayMapViewModel.getSections(dataset.lineid),
      );
    }
  }
}

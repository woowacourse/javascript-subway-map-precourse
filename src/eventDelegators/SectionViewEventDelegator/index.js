import { message } from '../../constants';

export default class SectionViewEventDelegator {
  constructor(sectionView, subwayMapViewModel) {
    this.sectionView = sectionView;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
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
    const sectionId = this.sectionView.managerContainer.querySelector('#section-station-selector')[
      this.sectionView.managerContainer.querySelector('#section-station-selector').selectedIndex
    ].dataset.id;
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

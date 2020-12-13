import { message } from '../../constants';

export default class SectionViewEventDelegator {
  constructor(element, sectionView, subwayMapViewModel) {
    this.sectionView = sectionView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }

  sectionManager() {
    this.sectionView.resetManagerContainer();
    this.sectionView.renderSectionManager();
  }

  selectLine(dataSet) {
    this.sectionView.resetSelectedLineSectionManagerContainer();
    this.sectionView.renderSelectedLineSectionManager(
      this.subwayMapViewModel.getLine(dataSet.id),
    );
  }

  addSection(dataSet) {
    const sectionId = document.getElementById('#section-station-selector')[
      document.getElementById('#section-station-selector').selectedIndex
    ].dataset.id;
    const sectionOrder = document.getElementById('#section-order-input').value;
    this.subwayMapViewModel.addSection(sectionId, dataSet.lineid, sectionOrder);
    this.sectionView.resetSectionTable();
    this.sectionView.renderSectionTable(
      dataSet.lineid,
      this.subwayMapViewModel.getSections(dataSet.lineid),
    );
  }

  deleteSection(dataSet) {
    if (confirm(message.ASK_WANT_TO_DELETE_IN_LINE)) {
      this.subwayMapViewModel.deleteSection(dataSet.lineid, dataSet.sectionid);
      this.sectionView.resetSectionTable();
      this.sectionView.renderSectionTable(
        dataSet.lineid,
        this.subwayMapViewModel.getSections(dataSet.lineid),
      );
    }
  }
}

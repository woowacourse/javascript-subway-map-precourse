import { message } from '../../constants';

export default class LineViewEventDelegator {
  constructor(lineView, subwayMapViewModel) {
    this.lineView = lineView;
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

  lineManager() {
    this.lineView.resetManagerContainer();
    this.lineView.renderLineManager();
  }

  addLine() {
    const lineObject = {
      lineId: this.lineView.managerContainer.querySelector('#line-name-input').value,
      sections: [
        this.lineView.managerContainer.querySelector('#line-start-station-selector')[
          this.lineView.managerContainer.querySelector('#line-start-station-selector').selectedIndex
        ].dataset.id,
        this.lineView.managerContainer.querySelector('#line-end-station-selector')[
          this.lineView.managerContainer.querySelector('#line-end-station-selector').selectedIndex
        ].dataset.id,
      ],
    };

    this.subwayMapViewModel.addLine(lineObject);
    this.lineView.resetLineTable();
    this.lineView.renderLineTable(Object.entries(this.subwayMapViewModel.getLines()));
  }

  deleteLine(dataset) {
    if (confirm(message.ASK_WANT_TO_DELETE)) {
      this.subwayMapViewModel.deleteLine(dataset.lineid);
      this.lineView.resetLineTable();
      this.lineView.renderLineTable(Object.entries(this.subwayMapViewModel.getLines()));
    }
  }
}

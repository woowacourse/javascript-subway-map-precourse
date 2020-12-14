import { message } from '../../constants';

export default class LineViewEventDelegator {
  constructor(subwayMapViewModel) {
    this.lineView = null;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
  }

  bindLineView(lineView) {
    this.lineView = lineView;
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
    const [startSelector, endSelector] = [
      this.lineView.managerContainer.querySelector('#line-start-station-selector'),
      this.lineView.managerContainer.querySelector('#line-end-station-selector'),
    ];

    const lineObject = {
      lineId: this.lineView.managerContainer.querySelector('#line-name-input').value,
      sections: [
        startSelector[startSelector.selectedIndex].dataset.id,
        endSelector[endSelector.selectedIndex].dataset.id,
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

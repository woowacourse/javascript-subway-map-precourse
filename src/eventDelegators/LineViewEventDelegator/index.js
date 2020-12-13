import { message } from '../../constants';

export default class LineViewEventDelegator {
  constructor(element, lineView, subwayMapViewModel) {
    this.lineView = lineView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }

  lineManager() {
    this.lineView.resetManagerContainer();
    this.lineView.renderLineManager();
  }

  addLine() {
    const lineObject = {
      lineId: document.getElementById('#line-name-input').value,
      sections: [
        document.getElementById('#line-start-station-selector')[
          document.getElementById('#line-start-station-selector').selectedIndex
        ].dataset.id,
        document.getElementById('#line-end-station-selector')[
          document.getElementById('#line-end-station-selector').selectedIndex
        ].dataset.id,
      ],
    };

    this.subwayMapViewModel.addLine(lineObject);
    this.lineView.resetLineTable();
    this.lineView.renderLineTable(
      Object.entries(this.subwayMapViewModel.getLines()),
    );
  }

  deleteLine(dataSet) {
    if (confirm(message.ASK_WANT_TO_DELETE)) {
      this.subwayMapViewModel.deleteLine(dataSet.lineid);
      this.lineView.resetLineTable();
      this.lineView.renderLineTable(
        Object.entries(this.subwayMapViewModel.getLines()),
      );
    }
  }
}

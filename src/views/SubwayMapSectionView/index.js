import { message } from '../../constants';

class SectionViewEventDelegation {
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

  selectLine(dataSet) {
    this.sectionView.renderSelectedLineSectionManager(
      this.subwayMapViewModel.getLine(dataSet.id),
    );
  }

  addSection(dataSet) {
    const sectionId = document.getElementById('#section-station-selector')[
      document.getElementById('#section-station-selector').selectedIndex
    ].dataset.id;
    const sectionOrder = parseInt(
      document.getElementById('#section-order-input').value,
    );

    this.subwayMapViewModel.addSection(sectionId, dataSet.lineid, sectionOrder);
    this.sectionView.resetSectionTable();
    this.sectionView.renderSectionTable(
      dataSet.lineid,
      this.subwayMapViewModel.getSections(dataSet.lineid),
    );
  }

  deleteSection(dataSet) {
    this.subwayMapViewModel.deleteSection(dataSet.lineid, dataSet.sectionid);
    this.sectionView.resetSectionTable();
    this.sectionView.renderSectionTable(
      dataSet.lineid,
      this.subwayMapViewModel.getSections(dataSet.lineid),
    );
  }
}

export default class SubwayMapSectionView {
  constructor(subwayMapViewModel, managerContainer, sectionManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.sectionManagerButton = sectionManagerButton;

    this.addEventListenerToSectionManagerButton(this);
  }

  addEventListenerToSectionManagerButton(self) {
    this.sectionManagerButton.addEventListener(
      'click',
      this.handleSectionManagerButton.bind(this),
    );
  }

  handleSectionManagerButton() {
    this.resetManagerContainer();
    this.renderSectionManager();
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderSectionManager() {
    this.renderLineMenuButtons(
      Object.entries(this.subwayMapViewModel.getLines()),
    );

    new SectionViewEventDelegation(
      document.getElementById('#section-line-menu-button-container'),
      this,
      this.subwayMapViewModel,
    );
  }

  renderLineMenuButtons(lines) {
    let lineButtons = '';
    lines.forEach(line => {
      lineButtons += `
        <button data-id="${line[0]}" data-purpose="selectLine" class=".section-line-menu-button">
          ${line[0]}
        </button>
      `;
    });

    this.managerContainer.innerHTML = `
    <div id="#section-line-menu-button-container">
      <h3>${message.SECTION_INFORMATION}</h3>
      ${lineButtons}
    </div>
    `;
  }

  renderSelectedLineSectionManager(line) {
    const sectionSelector = this.renderSectionSelector(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
    const sectionOrderInput = `<input id="#section-order-input"></input>`;
    const sectionAddButton = `<button id="#section-add-button" data-lineid="${line.lineId}" data-purpose="addSection">${message.ADD}</button>`;
    this.managerContainer.innerHTML += `
      <div id="#section-selected-line-manager-container">
        <h3>${line.lineId} ${message.LINE_MANAGING}</h3>
        <p>${message.ADD_SECTION}</p>
        ${sectionSelector}
        ${sectionOrderInput}
        ${sectionAddButton}
      </div>
    `;
    this.renderSectionTableContainer();
    this.renderSectionTable(
      line.lineId,
      this.subwayMapViewModel.getSections(line.lineId),
    );
    new SectionViewEventDelegation(
      document.getElementById('#section-selected-line-manager-container'),
      this,
      this.subwayMapViewModel,
    );
    new SectionViewEventDelegation(
      document.getElementById('#section-table-container'),
      this,
      this.subwayMapViewModel,
    );
  }

  renderSectionSelector(sections) {
    let selectorOptions = ``;

    sections.forEach(section => {
      selectorOptions += `
        <option data-id="${section[0]}">${section[0]}</option>
      `;
    });

    const sectionSelector = `
      <select id= "#section-station-selector">
        ${selectorOptions}
      </select>
    `;

    return sectionSelector;
  }

  renderSectionTableContainer() {
    this.managerContainer.innerHTML += `
      <div id="#section-table-container"></div>
    `;
  }

  resetSectionTable() {
    document.getElementById('#section-table-container').innerHTML = '';
  }

  renderSectionTable(lineId, sections) {
    const sectionThead = this.renderSectionThead();
    const sectionTbody = this.renderSectionTbody(lineId, sections);

    const sectionTable = `
      <table id="#section-name-table">
        ${sectionThead}
        ${sectionTbody}
      </table>
    `;

    document.getElementById(
      '#section-table-container',
    ).innerHTML += sectionTable;
  }

  renderSectionThead() {
    const sectionThead = `
      <tr>
        <th>${message.ORDER}</th>
        <th>${message.NAME}</th>
        <th>${message.OPTION}</th>
      </tr>
    `;

    return sectionThead;
  }

  renderSectionTbody(lineId, sections) {
    let sectionTbody = ``;
    sections.forEach((section, index) => {
      sectionTbody += `
      <tr>
        <td>${index}</td>
        <td>${section.stationId}</td>
        <td>
          <button data-lineid="${lineId}"data-sectionid="${index}" data-purpose="deleteSection" class=".section-delete-button">${message.OPTION_DELETE}</button>
        </td>
      </tr>
    `;
    });

    return sectionTbody;
  }
}

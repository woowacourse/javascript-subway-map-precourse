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
      this[dataSet.purpose](dataSet.id);
    }
  }

  selectLine(id) {
    this.sectionView.renderSelectedLineSectionManager(
      this.subwayMapViewModel.getLine(id),
    );
    console.log(this.subwayMapViewModel.getLine(id));
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
    const sectionOrderInput = this.renderSectionOrderInput();
    this.managerContainer.innerHTML += `
      <div id="#section-selected-line-manager-container">
        <h3>${line.lineId} ${message.LINE_MANAGING}</h3>
        <p>${message.ADD_SECTION}</p>
        ${sectionOrderInput}
      </div>
    `;
  }

  renderSectionOrderInput() {
    const sectionOrderInput = `
      <input id="#section-order-input"></input>
    `;

    return sectionOrderInput;
  }
}

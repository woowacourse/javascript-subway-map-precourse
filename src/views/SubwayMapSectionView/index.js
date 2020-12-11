import { message } from '../../constants';

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
      this.handleSectionManagerButton.bind(self),
    );
  }

  test(event) {
    alert(event);
    console.log('test');
  }

  addEventListenerToLineMenuButtons(self) {
    let lineMenuButtons = document.getElementsByClassName(
      '.section-line-menu-button',
    );

    console.log(lineMenuButtons, 'lineMenuButtons');
    console.log(this.test);

    for (let i = 0; i < lineMenuButtons.length; i++) {
      console.log(self, 'self');
      lineMenuButtons[i].addEventListener('click', this.test);
    }
  }

  // handleStationDeleteButton(event) {
  //   this.subwayMapViewModel.deleteStation(event.target.dataset.id);

  //   this.resetStationTable();
  //   this.renderStationTable(
  //     Object.entries(this.subwayMapViewModel.getStations()),
  //   );
  //   this.addEventListenerToStationDeleteButtons(this);
  // }

  handleSectionManagerButton() {
    this.resetManagerContainer();
    this.renderSectionManager();
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderSectionManager() {
    const lineButtons = this.renderLineMenuButtons(
      Object.entries(this.subwayMapViewModel.getLines()),
    );
    this.managerContainer.innerHTML = `
      <h3>${message.SECTION_INFORMATION}</h3>
      ${lineButtons}
    `;

    this.addEventListenerToLineMenuButtons(this);

    this.renderSelectedLine();
  }

  renderLineMenuButtons(lines) {
    let lineButtons = ``;
    lines.forEach(line => {
      lineButtons += `
        <button data-id="${line[0]}" data-line-instance="${line[1]}" class=".section-line-menu-button">
          ${line[0]}
        </button>
      `;
    });

    return lineButtons;
  }

  renderSelectedLine() {
    this.managerContainer.innerHTML += `
      <h3>${message.LINE_MANAGING}</h3>
      <p>${message.ADD_SECTION}</p>
    `;
  }
}

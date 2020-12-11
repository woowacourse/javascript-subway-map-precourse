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
  }

  renderLineMenuButtons(lines) {
    let lineButtons = ``;
    lines.forEach(line => {
      lineButtons += `
        <button data-id="${line[0]}" class=".section-line-menu-button">
          ${line[0]}
        </button>
      `;
    });

    return lineButtons;
  }
}

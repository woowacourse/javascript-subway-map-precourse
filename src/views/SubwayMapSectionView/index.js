import { message } from '../../constants';

class EventDelegation {
  constructor(element) {
    element.addEventListener('click', this.onClicked.bind(this));
  }

  good() {
    alert('sss');
  }

  onClicked(event) {
    let id = event.target.dataset.id;

    if (id) {
      this[id]();
    }
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

  test(evt) {
    alert('test');
  }

  // addEventListenerToLineMenuButtons(self) {
  //   let lineMenuButtons = document.getElementsByClassName(
  //     '.section-line-menu-button',
  //   );

  //   console.log(lineMenuButtons);

  //   // for (let i = 0; i < lineMenuButtons.length; i++) {
  //   //   lineMenuButtons[i].addEventListener('click', this.test.bind(self));
  //   // }

  //   setTimeout(() => {
  //     for (let i = 0; i < lineMenuButtons.length; i++) {
  //       lineMenuButtons[i].addEventListener('click', this.test.bind(self));
  //     }
  //   }, 1);

  //   console.log(lineMenuButtons);
  // }

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

    console.log(document.getElementById('#section-line-menu-button-container'));

    new EventDelegation(
      document.getElementById('#section-line-menu-button-container'),
    );

    // this.addEventListenerToLineMenuButtons(this);

    // this.renderSelectedLine();
  }

  renderLineMenuButtons(lines) {
    let lineButtons = '';
    lines.forEach(line => {
      lineButtons += `
        <button data-id="good" class=".section-line-menu-button">
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

  renderSelectedLine() {
    this.managerContainer.innerHTML += `
      <h3>${message.LINE_MANAGING}</h3>
      <p>${message.ADD_SECTION}</p>
    `;
  }
}

import { menuButtons } from '../templates/index.js';

export default function ManagerButtonContainer({ selectMenu }) {
  this.container = document.querySelector('.manager-button-container');

  this.handelClickContainer = ({
    target: {
      id,
      dataset: { index },
    },
  }) => {
    if (id.includes('manager-button')) {
      return selectMenu(Number(index));
    }
  };

  this.container.innerHTML = menuButtons();
  this.container.addEventListener('click', this.handelClickContainer);
}

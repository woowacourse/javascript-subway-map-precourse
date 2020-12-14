export default function ManagerButtonContainer({ selectMenu }) {
  this.container = document.querySelector('.manager-button-container');

  this.handelClickContainer = ({ target: { id } }) => {
    if (id === 'station-manager-button') {
      return selectMenu(0);
    }

    if (id === 'line-manager-button') {
      return selectMenu(1);
    }

    if (id === 'section-manager-button') {
      return selectMenu(2);
    }

    if (id === 'map-print-manager-button') {
      return selectMenu(3);
    }
  };
  this.container.addEventListener('click', this.handelClickContainer);
}

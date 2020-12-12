const buttonIds = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];
export class HeaderButtons {
  constructor(props) {
    this.buttons = [];
    this.initiateDOM(props);
  }

  initiateDOM = ({ clickHeaders }) => {
    buttonIds.forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      button.addEventListener("click", clickHeaders);
      this.buttons.push(button);
    });
  };
}

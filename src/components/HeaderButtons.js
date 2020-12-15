const buttonIds = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];
export class HeaderButtons {
  constructor() {
    this.buttons = [];
  }

  render = ({ clickHeaders }) => {
    buttonIds.forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      button.addEventListener("click", clickHeaders);
      this.buttons.push(button);
    });
  };
}

export class HeaderButtons {
  constructor({ clickHeaders }) {
    this.initiateDOM();
    this.initiateEvent();

    this.clickHeaders = clickHeaders;
  }

  initiateDOM = () => {
    this.stationManagerButton = document.getElementById(
      "station-manager-button"
    );
    this.listManagerButton = document.getElementById("line-manager-button");
    this.sectionManagerButton = document.getElementById(
      "section-manager-button"
    );
    this.mapPrintManagerButton = document.getElementById(
      "map-print-manager-button"
    );
  };

  initiateEvent = () => {
    this.stationManagerButton.addEventListener("click", () => {
      this.clickHeaders(0);
    });
    this.listManagerButton.addEventListener("click", () => {
      this.clickHeaders(1);
    });
    this.sectionManagerButton.addEventListener("click", () => {
      this.clickHeaders(2);
    });
    this.mapPrintManagerButton.addEventListener("click", () => {
      this.clickHeaders(3);
    });
  };
}

export default class App {
  constructor() {}

  onClickMenuButton(event) {
    const target = event.target;
    if (target.id === "station-manager-button") {
      //
    }

    if (target.id === "line-manager-button") {
      //
    }

    if (target.id === "section-manager-button") {
      //
    }

    if (target.id === "map-print-manager-button") {
      //
    }
  }
}

const app = new App();
document.addEventListener("click", (event) => app.onClickMenuButton(event));

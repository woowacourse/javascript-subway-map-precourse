import Line from "./line.js";
import { createCustomElement } from "./table.js";

class Show {
  constructor() {
    this.lines = Line.lines;
    this.showLines();
  }

  showLines = () => {
    const previewContainer = document.getElementById("station-line");
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const name = Object.keys(this.lines)[i];
      previewContainer.appendChild(
        createCustomElement({
          tag: "h2",
          innerHTML: name,
        })
      );
      previewContainer.appendChild(this.showLine(name));
    }
  };
}

export default new Show();

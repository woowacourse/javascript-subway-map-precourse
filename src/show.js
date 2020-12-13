import Line from "./line.js";
import { createCustomElement } from "./table.js";

class Show {
  constructor() {
    this.lines = Line.lines;
    this.showLines();
  }

  showLine = name => {
    const ul = document.createElement("ul");
    for (let i = 0; i < this.lines[name].length; i++) {
      const li = document.createElement("li");
      li.innerHTML = this.lines[name][i];
      ul.appendChild(li);
    }

    return ul;
  };

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

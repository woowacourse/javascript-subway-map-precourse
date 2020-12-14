import Storage from "./storage.js";
import { createCustomElement } from "./table.js";

class Show {
  constructor() {
    this.lines = {};
    this.refreshShow();
  }

  refreshShow = () => {
    const lines = Storage.loadItems("line");
    if (lines !== null) this.lines = lines;
    this.showLines();
  };

  showLine = name => {
    const ul = document.createElement("ul");
    for (let i = 0; i < this.lines[name].length; i++) {
      const li = document.createElement("li");
      li.innerHTML = this.lines[name][i];
      ul.appendChild(li);
    }

    return ul;
  };

  mapLines = () => {
    const mapContainer = createCustomElement({ tag: "div", className: "map" });
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const name = Object.keys(this.lines)[i];
      mapContainer.appendChild(
        createCustomElement({
          tag: "h2",
          innerHTML: name,
        })
      );
      mapContainer.appendChild(this.showLine(name));
    }

    return mapContainer;
  };

  showLines = () => {
    const previewContainer = document.getElementById("station-line");
    previewContainer.appendChild(this.mapLines());
  };
}

export default new Show();

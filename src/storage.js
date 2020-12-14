import { createCustomElement } from "./table.js";

class Storage {
  saveItems = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  loadItems = key => {
    let data = localStorage.getItem(key);
    console.log(data);
    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  };

  createStationSelect = container => {
    container.innerHTML = "";
    const stations = this.loadItems("station");
    console.log(stations);
    for (let i = 0; i < stations.length; i++) {
      container.appendChild(
        createCustomElement({ tag: "option", innerHTML: stations[i] })
      );
    }

    return container;
  };
}

export default new Storage();

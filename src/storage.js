import { createCustomElement } from "./table.js";

class Storage {
  saveItems = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  loadItems = key => {
    let data = localStorage.getItem(key);
    if (data !== null) {
      data = JSON.parse(data);
    }

    return data;
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

import { DOM_ID } from "../utils/constants.js";

export default class Component {
  constructor() {
    console.log("-----Component------");
    this._app = document.getElementById(DOM_ID.ID);

    this.stations = [];
    this.lines = [];

    this.initLocalStorage();
  }

  initLocalStorage() {
    this.stationStorage();
    this.lineStorage();
  }

  stationStorage() {
    const storageKey = "STATION";
    const loadedStorage = localStorage.getItem(storageKey);

    if (loadedStorage === null) {
      localStorage.setItem(storageKey, JSON.stringify(this.stations));
    } else {
    }
  }

  lineStorage() {
    const storageKey = "LINE";
    const loadedStorage = localStorage.getItem(storageKey);

    if (loadedStorage === null) {
      localStorage.setItem(storageKey, JSON.stringify(this.stations));
    } else {
    }
  }
}

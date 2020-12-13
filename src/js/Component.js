import { DOM_ID } from "../utils/constants.js";
import myLocalStroageKey from "../utils/myLocalStorageKey.js";

export default class Component {
  constructor(stateId) {
    console.log("-----Component------");
    this._app = document.getElementById(DOM_ID.ID);

    this.stations = [];
    this.lines = [];
    console.log(stateId);
    this.localStorageKey = myLocalStroageKey(stateId);
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
      this.stations = JSON.parse(localStorage.getItem(storageKey));
    }
  }

  lineStorage() {
    const storageKey = "LINE";
    const loadedStorage = localStorage.getItem(storageKey);

    if (loadedStorage === null) {
      localStorage.setItem(storageKey, JSON.stringify(this.stations));
    } else {
      this.lines = JSON.parse(localStorage.getItem(storageKey));
    }
  }

  saveLocalStorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

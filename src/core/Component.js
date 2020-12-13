import { dispatchReRender } from "../utils/events.js";

export default class Component {
  constructor() {
    this.state = {};
    this.store = {};
  }

  setStore(store) {
    this.store = store;
    localStorage.setItem("store", JSON.stringify(store));
    dispatchReRender();
  }
}

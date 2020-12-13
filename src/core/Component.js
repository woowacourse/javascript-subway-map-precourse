import { dispatchReRender } from "../utils/events.js";

export default class Component {
  constructor() {
    this.state = {};
    this.store = {};
  }

  setState(state) {
    this.state = state;
    dispatchReRender();
  }

  setStore(store) {
    this.store = store;
    localStorage.setItem("store", JSON.stringify(store));
    dispatchReRender();
  }

  create() {
    const store = localStorage.getItem("store");
    if (store) {
      this.store = JSON.parse(store);
    }
  }

  afterCreate() {}

  mount() {}

  render() {}
}

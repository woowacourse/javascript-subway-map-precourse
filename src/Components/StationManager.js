import { StationManagerHTML } from "../utils/templates/stationManager.js";

class StationManager {
  constructor({ $target }) {
    this.$target = $target;
    this.innerHTML = StationManagerHTML();

    this.bindEvents();
    this.render();
  }

  bindEvents() {}
  render() {
    this.$target.innerHTML = this.innerHTML;
  }
}

export default StationManager;

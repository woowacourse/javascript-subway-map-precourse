class StationManager {
  constructor($target, { stationStore, lineStore }) {
    console.log(`StationManager`);
    this.$target = $target;

    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div id="station-input"></div>
      <div id="station-table"></div>
    `;
  }

  mountDOMs() {
    this.$stationInput = this.$target.querySelector("#station-input");
    this.$stationTable = this.$target.querySelector("#station-table");
  }

  mountComponents() {}

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default StationManager;

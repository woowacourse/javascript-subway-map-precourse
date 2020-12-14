import Menu from "./Menu.js";

class App {
  constructor({ $target }) {
    this.$target = $target;

    this.render();
  }

  mountTemplates() {
    this.$target.innerHTML = `
      <h1>🚇 지하철 노선도 관리 </h1>
      <nav id="menu"></nav>
      <section id="manager-container"></section>
    `;
  }

  mountDOMs() {
    this.$menu = document.querySelector(`#menu`);
    this.$managerContainer = document.querySelector(`#manager-container`);
  }

  mountComponents() {
    new Menu({ $target: this.$menu });
  }

  render = () => {
    this.mountTemplates();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default App;

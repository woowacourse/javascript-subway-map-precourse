export default function Header({ $target }) {
  this.$target = $target;

  this.render = () => {
    const HTMLString = `
      <header>
        <h1>🚇 지하철 노선도 관리 </h1>
      </header>
    `;

    this.$target.insertAdjacentHTML("afterbegin", HTMLString);
  };

  this.render();
}

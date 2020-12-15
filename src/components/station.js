export default {
  station: [],
  init(page) {
    this.page = page;
    this.station = ["test"];
    this.render();
  },
  render() {
    console.log(this.station);
    const innerHTML = this.station.reduce((prevHTML, station) => {
      return (
        prevHTML +
        `<tr>
        <td>${station}</td>
        <td>
          <button data-station="${station}">삭제</button>
        </td>
      </tr>`
      );
    }, "");
    const $tbody = document.querySelector("tbody");
    console.log($tbody);
    $tbody.innerHTML = innerHTML;
  },
};

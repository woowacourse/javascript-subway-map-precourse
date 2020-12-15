export default {
  isAddedEvent: false,
  station: [],
  init(page) {
    this.page = page;
    this.station = [];
    this.render();
    if (!this.isAddedEvent) {
      this.addEvents();
    }
    this.isAddedEvent = true;
  },
  addEvents() {
    const $btnAdd = document.querySelector("#station-add-button");
    $btnAdd.addEventListener("click", () => this.clickAdd());
  },
  clickAdd() {
    const $input = document.querySelector("#station-name-input");
    const { value: name } = $input;
    if (!name) {
      alert("역의 이름이 없습니다. 역 이름을 입력해주세요.");
      return;
    }
    if (this.station.indexOf(name) > -1) {
      alert("이미 등록된 역입니다. 다른 역을 입력해주세요.");
      return;
    }
    this.station.push(name);
    this.render();
    $input.value = "";
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

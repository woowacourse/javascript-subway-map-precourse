import { Station } from "../models/index.js";

export default {
  eventBinded: false,

  init(element) {
    this.el = element;
    this.render();
    this.eventBinded || this.bindEvents.call(this);
    this.eventBinded = true;
  },

  query(selector) {
    return this.el.querySelector(selector);
  },

  render() {
    const content = Station.list().reduce((html, name) => {
      return (
        html +
        `
        <tr>
          <td>${name}</td>
          <td>
            <button data-name="${name}">삭제</button>
          </td>
        </tr>
      `
      );
    }, "");
    this.query("tbody").innerHTML = content;
  },

  bindEvents() {
    this.query("#station-add-button").addEventListener(
      "click",
      this.onClickAdd.bind(this)
    );
    this.query("tbody").addEventListener(
      "click",
      this.onClickRemove.bind(this)
    );
  },

  onClickAdd() {
    const input = document.querySelector("#station-name-input");
    const name = input.value;

    if (!name) {
      return alert("역 이름을 입력해주세요.");
    }

    try {
      Station.add(name);
      this.render();
    } catch (error) {
      alert(error.message);
    }

    input.value = "";
  },

  onClickRemove(e) {
    if (e.target.tagName !== "BUTTON") return false;
    if (!confirm("삭제하시겠습니까?")) return false;

    const name = e.target.dataset.name;
    Station.remove(name);
    this.render();
  },
};

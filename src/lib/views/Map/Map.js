import { MAP_DIV } from "../../common/IdAndClassNames.js";

export default class Map {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = MAP_DIV;
    this.element.innerHTML = `<h1>지하철 노선도 출력</h1>`;
  }

  render() {
    return this.element;
  }
}

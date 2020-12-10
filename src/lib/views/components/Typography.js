export default class Typography {
  constructor(innerText) {
    this.element = document.createElement("p"); // 나중에 타입보고 바꾸기
    this.element.innerText = innerText;
  }

  getElement() {
    return this.element;
  }

  addToParentNode($parentNode) {
    $parentNode.appendChild(this.getElement());
  }
}

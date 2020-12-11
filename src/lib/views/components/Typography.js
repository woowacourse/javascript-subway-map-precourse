export default class Typography {
  constructor(innerText, tagName) {
    this.element = document.createElement(tagName); // 나중에 타입보고 바꾸기
    this.element.innerText = innerText;
  }

  getElement() {
    return this.element;
  }

  addToParentNode($parentNode) {
    $parentNode.appendChild(this.getElement());
  }

  render() {
    return this.element.outerHTML;
  }
}

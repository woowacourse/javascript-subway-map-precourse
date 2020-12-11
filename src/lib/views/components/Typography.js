export default class Typography {
  constructor(innerText, tagName) {
    this.element = document.createElement(tagName);
    this.element.innerText = innerText;
  }

  render() {
    return this.element.outerHTML;
  }
}

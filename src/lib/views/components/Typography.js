export default class Typography {
  constructor(innerText, tagName) {
    this.element = tagName
      ? document.createElement(tagName)
      : document.createElement("p");
    this.element.innerText = innerText;
  }

  render() {
    return this.element.outerHTML;
  }
}

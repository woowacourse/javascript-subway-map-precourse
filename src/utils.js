const Utils = function () {
  this.getLocalStorageData = () => {
    const { stations, lines } = window.localStorage;
    return [stations, lines];
  };
  this.setLocalStorageDataOf = (item, value) => {
    window.localStorage.setItem(item, value);
  };
  this.resultDIV = document.getElementById("result");

  this.setAttributes = (tag, attributes) => {
    for (let i in attributes) {
      tag.setAttribute(i, attributes[i]);
    }
  };
  this.appendChildrenToParent = (parentNode, ...ChildElements) => {
    for (let i = 0; i < ChildElements.length; i++) {
      parentNode.appendChild(ChildElements[i]);
    }
  };
  this.createElementWithOption = (typeOfTag, attributes, AnInsertedText) => {
    const result = document.createElement(typeOfTag);
    if (AnInsertedText) {
      const innerText = document.createTextNode(AnInsertedText);
      this.appendChildrenToParent(result, innerText);
    }
    if (attributes) this.setAttributes(result, attributes);
    return result;
  };
};

export const {
  getLocalStorageData,
  setLocalStorageDataOf,
  resultDIV,
  setAttributes,
  appendChildrenToParent,
  createElementWithOption,
} = new Utils();

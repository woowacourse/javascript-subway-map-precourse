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
};

export const {
  getLocalStorageData,
  setLocalStorageDataOf,
  resultDIV,
  setAttributes,
  appendChildrenToParent,
} = new Utils();

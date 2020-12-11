const Utils = function () {
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

  this.appendRecursiveChildrenToParent = (parent, ...children) => {
    for (let i = 0; i < children.length; i++) {
      if (Array.isArray(children[i]))
        children[i] = this.appendRecursiveChildrenToParent(...children[i]);
    }
    this.appendChildrenToParent(parent, ...children);
    return parent;
  };
};

export const { resultDIV } = new Utils();

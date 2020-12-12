const Visualization = function () {
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

  this.getTableHeadByTexts = (texts) => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    texts.forEach((text) => {
      const th = createElementWithOption("th", null, text);
      this.appendChildrenToParent(tr, th);
    });
    this.appendChildrenToParent(thead, tr);
    return thead;
  };

  this.getTableHavingTableHead = (texts) => {
    const table = document.createElement("table");
    const thead = this.getTableHeadByTexts(texts);
    this.appendChildrenToParent(table, thead);
    return table;
  };

  this.convertDataArrayToElementArray = (
    elementType,
    attributes,
    dataArray
  ) => {
    return dataArray.map((data) =>
      createElementWithOption(elementType, attributes, data)
    );
  };
};

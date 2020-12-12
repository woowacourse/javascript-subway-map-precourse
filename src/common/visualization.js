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

  this.appendRecursiveChild = (parent, ...children) => {
    for (let i = 0; i < children.length; i++) {
      if (Array.isArray(children[i]))
        children[i] = this.appendRecursiveChild(...children[i]);
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

  this.convertDataArrayToElementArray = (elementType, attributes, dataArray) =>
    dataArray.map((data, index) => {
      const iterableAttributeObj = { ...attributes };
      for (let i in iterableAttributeObj) {
        if (iterableAttributeObj[i] === "valueInArray")
          iterableAttributeObj[i] = index.toString();
      }
      return this.createElementWithOption(
        elementType,
        iterableAttributeObj,
        data
      );
    });
};

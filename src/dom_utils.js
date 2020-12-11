export default class DomUtils {
  constructor() {
    this.DO_NOT_APPEND = false;
  }

  createButton(idName, buttonText) {
    const button = document.createElement('button');

    this.setAttribute(button, idName);
    this.setInnerHtml(button, buttonText);

    return button;
  }

  setAttribute(varName, idName) {
    varName.setAttribute('id', idName);
  }

  setInnerHtml(varName, buttonText) {
    varName.innerHTML = buttonText;
  }

  appendTo(toIdName, varName) {
    document.getElementById(toIdName).appendChild(varName);
  }

  appendBefore(toIdName, varName, before) {
    const toVarName = document.getElementById(toIdName);

    toVarName.insertBefore(varName, before);
  }

  createArticle(toIdName, idName) {
    const article = document.createElement('ARTICLE');

    this.setAttribute(article, idName);
    this.appendTo(toIdName, article);

    return article
  }

  displayNone(varName) {
    varName.style.display = "none";
  }

  createInput(inputObject) {
    const input = document.createElement('input');

    this.setAttribute(input, inputObject['idName']);
    this.setInputType(input, inputObject['type']);
    this.setPlaceholder(input, inputObject['placeholder']);
    this.appendTo(inputObject['toIdName'], input)

    return input;
  }

  setInputType(input, type) {
    input.setAttribute('type', type);
  }

  setPlaceholder(input, placeholder) {
    input.placeholder = placeholder;
  }
}
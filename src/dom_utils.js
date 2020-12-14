export default class DomUtils {
  constructor() {
    this.DO_NOT_APPEND = false;
    this.ID_ATTRIBUTE = 'id';
  }

  createButton(idName, buttonText) {
    const button = document.createElement('button');

    this.setAttribute(this.ID_ATTRIBUTE, button, idName);
    this.setInnerHtml(button, buttonText);

    return button;
  }

  createArticle(toIdName, idName) {
    const article = document.createElement('ARTICLE');

    this.setAttribute(this.ID_ATTRIBUTE, article, idName);
    this.appendToIdName(toIdName, article);

    return article
  }

  setAttribute(attribute, varName, attributeName) {
    varName.setAttribute(attribute, attributeName);
  }

  setInnerHtml(varName, buttonText) {
    varName.innerHTML = buttonText;
  }

  appendToIdName(toIdName, varName) {
    document.getElementById(toIdName).appendChild(varName);
  }

  appendToVarName(toVarName, varName) {
    toVarName.appendChild(varName);
  }

  appendBefore(toIdName, varName, before) {
    const toVarName = document.getElementById(toIdName);

    toVarName.insertBefore(varName, before);
  }

  displayNone(varName) {
    varName.style.display = "none";
  }

  createInput(inputObject) {
    const input = document.createElement('input');

    this.setAttribute(this.ID_ATTRIBUTE, input, inputObject['idName']);
    this.setInputType(input, inputObject['type']);
    this.setPlaceholder(input, inputObject['placeholder']);
    this.appendToIdName(inputObject['toIdName'], input)

    return input;
  }

  setInputType(input, type) {
    input.setAttribute('type', type);
  }

  setPlaceholder(input, placeholder) {
    input.placeholder = placeholder;
  }
}
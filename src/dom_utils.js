export default class DomUtils {
  constructor() {
    this.DO_NOT_APPEND = false;
  }

  createButton(idName, managerButton) {
    const button = document.createElement('button');

    this.setAttribute(button, idName);
    this.setInnerHtml(button, idName, managerButton);
    this.appendTo('app', button);

    return button;
  }

  setAttribute(tag, idName) {
    tag.setAttribute('id', idName);
  }

  setInnerHtml(tag, idName, managerButton) {
    tag.innerHTML = managerButton[idName]
  }

  appendTo(toIdName, varName) {
    document.getElementById(toIdName).appendChild(varName);
  }

  createArticle(toIdName, idName) {
    const article = document.createElement('ARTICLE');

    this.setAttribute(article, idName);
    if (toIdName !== this.DO_NOT_APPEND)
      this.appendTo(toIdName, article);

    return article
  }
}
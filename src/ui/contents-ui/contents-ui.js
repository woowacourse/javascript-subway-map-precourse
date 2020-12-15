export class contentsUI {
  constructor(contentsID, subwayINFOManager) {
    this._contentsID = contentsID;
    this._subwayINFOManager = subwayINFOManager;
  }
  setContentsHTML(initialTemplate) {
    document.getElementById(this._contentsID).innerHTML = initialTemplate;
  }

  _getInputTextByID(id) {
    return document.getElementById(id).value.trim();
  }
  _getAllElementsByClass(className) {
    return document.querySelectorAll("." + className);
  }
  _getSelectedOptionByID(id) {
    const selector = document.getElementById(id);
    return selector[selector.selectedIndex].value;
  }
  _addClickEventToButtonByID(id, callback) {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      callback.call(this);
    });
  }
  _addClickEventToAllButtonByClassName(className, callback) {
    const buttons = document.querySelectorAll("." + className);
    Array.prototype.forEach.call(buttons, (button) => {
      button.addEventListener("click", (event) => {
        callback.call(this, event);
      });
    });
  }
}

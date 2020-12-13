export class contentsUI {
  constructor(contentsID, stationINFOManager) {
    this.contentsID_ = contentsID;
    this.stationINFOManager_ = stationINFOManager;
  }

  setContentsHTML(initialTemplate) {
    document.getElementById(this.contentsID_).innerHTML = initialTemplate;
  }

  getInputTextByID(id) {
    return document.getElementById(id).value.trim();
  }
  getAllElementsByClass(className) {
    return document.querySelectorAll("." + className);
  }
  getSelectedOptionByID(id) {
    const selector = document.getElementById(id);
    return selector[selector.selectedIndex].value;
  }
  addClickEventToAllButtonByClassName(className, callback) {
    const button = document.querySelector("." + className);
    button.addEventListener("click", (event) => {
      callback(event);
    });
  }
}

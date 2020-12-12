import Line from "./line.js";
class Section {
  constructor() {
    this.lines = Line.lines;
    this.showMenuButton();
  }

  showMenuButton = () => {
    const sectionMenuContainer = document.getElementById("sect-menus");
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const button = document.createElement("button");
      button.innerHTML = Object.keys(this.lines)[i];
      button.className = "section-line-menu-button";
      sectionMenuContainer.appendChild(button);
    }

    this.handleMenuButton();
  };
}

export default new Section();

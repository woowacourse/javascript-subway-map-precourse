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

  handleMenuButton = () => {
    const sectionMenuBtns = document.getElementsByClassName(
      "section-line-menu-button"
    );
    for (let i = 0; i < sectionMenuBtns.length; i++) {
      sectionMenuBtns[i].addEventListener("click", this.showSectionLine);
    }
  };
}

export default new Section();

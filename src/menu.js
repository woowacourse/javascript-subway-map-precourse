import Station from "./station.js";
import Line from "./line.js";
import Section from "./section.js";
import Show from "./show.js";

class Menu {
  displayMenu = e => {
    const container = document.getElementsByClassName("content");
    const columnIndex = parseInt(e.target.dataset.column);

    for (let i = 0; i < container.length; i++) {
      if (i + 1 === columnIndex) {
        container[i].style.display = "block";
      } else {
        container[i].style.display = "none";
      }
    }
  };

  handleLoadMenuContainer = () => {
    const stationMenuBtn = document.getElementById("station-manager-button");
    const lineMenuBtn = document.getElementById("line-manager-button");
    const sectionMenuBtn = document.getElementById("section-manager-button");
    const showMenuBtn = document.getElementById("map-print-manager-button");

    stationMenuBtn.addEventListener("click", () => new Station());
    lineMenuBtn.addEventListener("click", () => new Line());
    sectionMenuBtn.addEventListener("click", () => new Section());
    showMenuBtn.addEventListener("click", () => new Show());
  };

  handleMenuClick = () => {
    const menuBtns = document.querySelectorAll(".menu button");
    menuBtns.forEach(button => {
      button.addEventListener("click", this.displayMenu);
    });

    this.handleLoadMenuContainer();
  };
}

export const { handleMenuClick } = new Menu();

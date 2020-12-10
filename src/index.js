class ManageSubwayLine {
  constructor() {
    this.handleMenuClick();
  }

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

  handleMenuClick = () => {
    const menus = document.querySelectorAll(".menu button");

    menus.forEach(menu => {
      menu.addEventListener("click", this.displayMenu);
    });
  };
}

new ManageSubwayLine();

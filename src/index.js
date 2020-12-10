class ManageSubwayLine {
  constructor() {
    //this.resetContentContainer();
    this.handleMenuClick();
  }

  handleMenuClick = () => {
    const menus = document.querySelectorAll(".menu button");

    menus.forEach(menu => {
      menu.addEventListener("click", this.displayMenu);
    });
  };
}

new ManageSubwayLine();

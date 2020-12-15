import Menu from "./components/Menu.js";
const $pages = document.querySelectorAll(".menu-page");
$pages.forEach((page) => (page.style.display = "none"));
new Menu();

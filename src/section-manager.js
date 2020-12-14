export default function SectionManager() {
  this.addSelectButton = function() {
    let i;
    for (i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const parsedObject = JSON.parse(localStorage.getItem(key));
      if (parsedObject.position === "line") {
        const select = document.querySelector("#select")
        select.innerHTML += `<button type="button" class="section-line-menu-button">${localStorage.key(i)}</button>`
      }
    }
  }

  this.init = function() {
   const section = document.querySelector("#section");
   const table = document.querySelector("#table");
   section.style.display = "none";
   table.style.display = "none";
   this.addSelectButton();
  }
  this.init();
}

new SectionManager();
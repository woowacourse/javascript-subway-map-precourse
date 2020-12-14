export default function SectionManager() {
  this.addShowEvent = function() {
    const sectionLineMenuButton = document.getElementsByClassName("section-line-menu-button");
    let i;
    for (i = 0; i < sectionLineMenuButton.length; i++) {
      const lineName = sectionLineMenuButton[i].dataset.buttonId;
      sectionLineMenuButton[i].addEventListener("click", () => {
        const section = document.querySelector("#section")
        const lineText = document.querySelector("#line-text")
        const table = document.querySelector("#table")
        section.style.display = "block"
        lineText.innerText = `${lineName} 관리`
        table.style.display = "block"; 
      })
    }
  }

  this.addSelectButton = function() {
    let i;
    for (i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const parsedObject = JSON.parse(localStorage.getItem(key));
      if (parsedObject.position === "line") {
        const select = document.querySelector("#select")
        select.innerHTML += `<button type="button" data-button-id="${key}" class="section-line-menu-button">${localStorage.key(i)}</button>`
      }
      this.addShowEvent(key);
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
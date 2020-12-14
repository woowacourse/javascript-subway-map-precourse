export default function SectionManager() {
  this.addShowEvent = function(key) {
    const sectionLineMenuButton = document.getElementsByClassName("section-line-menu-button");
    let i;
    for (i = 0; i < sectionLineMenuButton.length; i++) {
      const lineName = sectionLineMenuButton[i].dataset.buttonId;
      sectionLineMenuButton[i].addEventListener("click", () => {
        const section = document.querySelector("#section")
        const lineText = document.querySelector("#line-text")
        section.style.display = "block"
        lineText.innerText = `${lineName} 관리`
      })
    }
  }

  this.addSelectButton = function() {
    const lines = JSON.parse(localStorage.getItem("line"))
    let i;
    for (i = 0; i < lines.length; i++) {
      const key = lines[i].name
      const select = document.querySelector("#select")
      select.innerHTML += `<button type="button" data-button-id="${key}" class="section-line-menu-button">${key}</button>`
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
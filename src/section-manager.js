export default function SectionManager() {
  this.init = function() {
   const section = document.querySelector("#section");
   const table = document.querySelector("#table");
   section.style.display = "none";
   table.style.display = "none";
  }
  this.init();
}

new SectionManager();
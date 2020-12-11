const menuIds = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];

export default class SubwayMapManager {
  constructor() {
    this.clickMenuEventListener();
  }

  clickMenuEventListener() {
    menuIds.forEach((id) => {
      const menuButton = document.getElementById(id);
      menuButton.addEventListener("click", () => this.clickMenuEvent(id));
    });
  }

  clickMenuEvent(id) {
    this.hideContentChildren();
    const isMap = Boolean(id.match("map"));
    if (isMap) {
      this.renderMapContent();
      return;
    }
    const content = document.getElementById(id.replace("button", "content"));
    content.style.display = "block";
  }

  hideContentChildren() {
    const contentChildren = document.getElementById("content").children;
    const contentChildrenRealArray = Array.from(contentChildren);
    contentChildrenRealArray.forEach((el) => (el.style.display = "none"));
    const mapContent = document.getElementsByClassName("map")[0];
    if (mapContent !== undefined) {
      mapContent.remove();
    }
  }

  renderMapContent() {
    const newEl = document.createElement("div");
    newEl.setAttribute("class", "map");
    newEl.innerHTML = "노선 출력 내용";
    const contentEl = document.getElementById("content");
    contentEl.appendChild(newEl);
  }
}

new SubwayMapManager();

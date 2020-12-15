import { dispatchReRender, RE_RENDER_EVENT } from "./utils/events.js";
import { elementMap } from "./config.js";
import reRenderPage from "./utils/reRenderPage.js";

function init() {
  const app = document.querySelector("#app");
  let page;

  elementMap.forEach((element) => {
    const managerPage = new element.page();
    element.button.addEventListener("click", () => {
      page = managerPage;
      dispatchReRender();
    });
  });

  window.addEventListener(RE_RENDER_EVENT, () => reRenderPage(app, page));
}

init();

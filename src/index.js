import HTMLManager from "./html-manager.js";

const BODY_ID = "app";

new HTMLManager({
  htmlOfBody: document.querySelector("#" + BODY_ID),
});

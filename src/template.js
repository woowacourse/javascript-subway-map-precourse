import { TEMPLATE } from "./constants.js";

export function setTemplateVisible(menu) {
    menu.style.display = "block";
}

export function clearTemplate() {
    TEMPLATE.STATION.style.display = "none";
    TEMPLATE.LINE.style.display = "none";
    TEMPLATE.SECTION.style.display = "none";
    TEMPLATE.MAP.style.display = "none";
}
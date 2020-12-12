import { displayShow, displayhide } from "../utils/handleDom.js";

const contentIds = [
  "station-manager-container",
  "line-manager-container",
  "section-manager-container",
  "map-print-manager-container",
];
export class ContentContainer {
  constructor() {}

  render = ({ id }) => {
    contentIds.forEach((contentId) => {
      const content = document.getElementById(contentId);
      if (contentId === id) {
        displayShow(content);
      } else {
        displayhide(content);
      }
    });
  };
}

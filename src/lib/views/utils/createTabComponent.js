import Div from "../components/Div.js";
import { tabs } from "../../common/IdAndClassNames.js";
import Station from "../Station/Station.js";
import Line from "../Line/Line.js";
import Section from "../Section/Section.js";
import Map from "../Map/Map.js";

export default (index) => {
  const $tab = new Div(tabs[index].querySelector);
  const $childNodes = [new Station(), new Line(), new Section(), new Map()];

  $tab.element.innerHTML = $childNodes[index].render();

  return $tab.element;
};

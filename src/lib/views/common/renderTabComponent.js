import Station from "../Station/Station.js";
import Line from "../Line/Line.js";
import Section from "../Section/Section.js";
import Map from "../Map/Map.js";

export default (index) => {
  const $tabs = [new Station(), new Line(), new Section(), new Map()];
  return $tabs[index].render();
};

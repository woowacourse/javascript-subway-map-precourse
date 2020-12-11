import Div from "../components/Div.js";
import { tabs } from "../../common/IdAndClassNames.js";
import Station from "../Station/Station.js";
import Line from "../Line/Line.js";
import Section from "../Section/Section.js";
import Map from "../Map/Map.js";

//여기는 생성된 자식 컴포넌트를 그냥 받아만 줘서 유저 엑션에 넘기자

export default (index) => {
  const $tab = new Div(tabs[index].querySelector);
  const $test = document.createElement("p");
  $test.innerText = tabs[index].title;
  $test.onclick = () => alert(tabs[index].title);
  $tab.element.appendChild($test);

  return $tab.element;
};

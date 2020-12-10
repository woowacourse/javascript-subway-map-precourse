import Div from "../components/Div.js";
import Typography from "../components/Typography.js";
import { tabs } from "../../common/IdAndClassNames.js";

export default (index) => {
  const $tab = new Div(tabs[index].querySelector);
  const $test = new Typography(tabs[index].title);
  $test.addToParentNode($tab.element);
  return $tab.element;
};

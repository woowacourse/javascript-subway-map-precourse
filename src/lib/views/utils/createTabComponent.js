import Div from "../components/Div.js";
import Typography from "../components/Typography.js";
import { tabs } from "../../common/IdAndClassNames.js";

export default (index) => {
  const $tab = new Div(tabs[index].querySelector);
  const $inputHelperText = new Typography(`${tabs[index].title} 이름`);
  $inputHelperText.addToParentNode($tab.element);
  return $tab.element;
};

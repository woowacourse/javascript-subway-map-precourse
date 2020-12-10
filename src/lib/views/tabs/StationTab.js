import Div from "../components/Div.js";
import Typography from "../components/Typography.js";
import {
  STATION_DIV,
} from "../../common/IdAndClassNames.js";


export default () => {
  const $stationTab = new Div(STATION_DIV);
  const $testText = new Typography("지하철 역");
  $testText.addToParentNode($stationTab.element);

  return $stationTab;
};
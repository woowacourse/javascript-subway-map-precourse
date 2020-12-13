import { contentsUI } from "./contents-ui.js";

export default class MapPrintManager extends contentsUI {
  constructor(contentsID, stationINFOManager) {
    super(contentsID, stationINFOManager);
    this.setContentsHTML(INITIAL_TEMPLATE);
  }

  setContentsHTML(initialTemplate) {
    super.setContentsHTML(initialTemplate);
  }
}

const INITIAL_TEMPLATE = `
<h2>1호선</h2>
<ul>
  <li>인천</li>
  <li>소요산</li>
</ul>
<h2>2호선</h2>
<ul>
  <li>인천</li>
  <li>소요산</li>
</ul>
<h2>3호선</h2>
<ul>
  <li>인천</li>
  <li>소요산</li>
</ul>
`;

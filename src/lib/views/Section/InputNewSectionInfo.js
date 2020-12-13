import Typography from "../components/Typography.js";
import { SECTION_INFO_INPUT_CONTAINER_ID } from "../../common/IdAndClassNames.js";
// 구간 등록 부분 정보 업데이트
export default class InputNewSectionInfo {
  constructor(lineName) {
    this.element = document.createElement("div");
    this.element.id = SECTION_INFO_INPUT_CONTAINER_ID.substring(1);
    this.addSectionTitle = new Typography(`${lineName} 관리`, "h3");
  }

  render() {
    [this.addSectionTitle.element].forEach(($element) =>
      this.element.appendChild($element),
    );
  }
}

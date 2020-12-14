import { rendStationMap, clearMangeContainer } from "../views/domController.js";

export default class MapPrintManager {
  render() {
    clearMangeContainer();
    rendStationMap();
  }
}

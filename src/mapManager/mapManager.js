import { showMapHTML, hideMapHTML } from "./mapView.js"
import { Data } from "../data.js"

export class MapManager {
    static show = () => {
        showMapHTML(Data.getLineRepository());
    }

    static hide = () => {
        hideMapHTML();
    }
}
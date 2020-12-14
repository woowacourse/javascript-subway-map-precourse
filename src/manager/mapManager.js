import { showMapHTML, hideMapHTML } from "../view/mapView.js"
import { Data } from "../component/data.js"

export class MapManager {
    static show = () => {
        showMapHTML(Data.getLineRepository());
    }

    static hide = () => {
        hideMapHTML();
    }
}
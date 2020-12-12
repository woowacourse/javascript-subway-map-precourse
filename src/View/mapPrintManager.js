import { getAllLines } from "../Controller/lineManager.js";
import { alertAndClear, appendChilds, clearAllContents, makeElement } from "../Controller/utils.js";
import words from '../key/words.js';
import Line from '../Model/Line.js';
import { errorAlertMessages } from '../key/alertMessages.js';


const mapPrintContainer = (container) => {
	if(Line.readAllLines().length<1){
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_LINE);
		return;
	}
	const allLines = getAllLines();
	const mapContainer = makeElement({ tag: 'div', classes:[words.MAP_CONTAINER_CLASS] })
	allLines.forEach(line => {
		const lineNameElement = makeElement({ tag: "b", innerText: line.name });
		const ulElement = makeElement({ tag: "ul" });
		appendChilds(ulElement, line.stations.map(stationName => makeElement({ tag: "li", innerText: stationName })));
		appendChilds(mapContainer,[lineNameElement, ulElement]);
	});
	clearAllContents(container);
	appendChilds(container, [mapContainer]);
};

export default mapPrintContainer;

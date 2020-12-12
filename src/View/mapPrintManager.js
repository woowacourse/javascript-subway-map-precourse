import { getAllLines } from '../Controller/lineManager.js';
import {
	alertAndClear,
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import words from '../key/words.js';
import { errorAlertMessages } from '../key/alertMessages.js';
import cssText from '../key/cssText.js';
import { canAccessThisPage } from '../Controller/mapPrintManager.js';

const mapPrintContainer = (container) => {
	const allLines = getAllLines();
	const mapContainer = makeElement({
		tag: 'div',
		classes: [words.MAP_CONTAINER_CLASS],
	});
	allLines.forEach((line) => {
		const lineNameElement = makeElement({
			tag: 'b',
			innerText: line.name,
			style: cssText.boldText(1.2, 800),
		});
		const ulElement = makeElement({ tag: 'ul' });
		appendChilds(
			ulElement,
			line.stations.map((stationName) =>
				makeElement({ tag: 'li', innerText: stationName })
			)
		);
		appendChilds(mapContainer, [lineNameElement, ulElement]);
	});
	clearAllContents(container);
	appendChilds(container, [mapContainer]);
};

export default mapPrintContainer;

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

const MapPrintContainer = function (container) {
	this.allLines = getAllLines();
	this.mapContainer = makeElement({
		tag: 'div',
		classes: [words.MAP_PRINT_CONTAINER_CLASS],
		style: cssText.marginTop(15)
	});
	this.allLines.forEach((line) => {
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
		appendChilds(this.mapContainer, [lineNameElement, ulElement]);
	});

	this.initializer = () => {
		clearAllContents(container);
		appendChilds(container, [this.mapContainer]);
	};
};

export default MapPrintContainer;

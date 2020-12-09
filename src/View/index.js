import lineContainer from './lineManager.js';
import mapPrintContainer from './mapPrintManager.js';
import sectionContainer from './sectionManager.js';
import stationContainer from './stationManager.js';

const viewContainers = {
	LINE_CONTAINER: lineContainer,
	MAP_PRINT_CONTAINER: mapPrintContainer,
	SECTION_CONTAINER: sectionContainer,
	STATION_CONTAINER: stationContainer,
};

export default viewContainers;

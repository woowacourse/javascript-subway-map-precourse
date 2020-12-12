import LineContainer from './lineManager.js';
import MapPrintContainer from './mapPrintManager.js';
import SectionContainer from './sectionManager.js';
import StationContainer from './stationManager.js';

const viewContainers = {
	LINE_CONTAINER: LineContainer,
	MAP_PRINT_CONTAINER: MapPrintContainer,
	SECTION_CONTAINER: SectionContainer,
	STATION_CONTAINER: StationContainer,
};

export default viewContainers;

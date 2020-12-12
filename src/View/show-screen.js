import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $mapContainer,
  $subwaySectionContainer,
} from './input.js';

export const showScreen = (e) => {
  if (e.target.id === 'station-manager-button') {
    return ($stationContainer.style.display = 'block');
  }
  if (e.target.id === 'line-manager-button') {
    return ($lineContainer.style.display = 'block');
  }
  if (e.target.id === 'section-manager-button') {
    return ($sectionContainer.style.display = 'block');
  }
  if (e.target.id === 'map-print-manager-button') {
    return ($mapContainer.style.display = 'block');
  }
};

export const showSectionScreen = () => {
  $subwaySectionContainer.style.display = 'block';
};

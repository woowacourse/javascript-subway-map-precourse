import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $mapContainer,
} from './input.js';
import {loadStation} from '../index.js';

export const showScreen = (e) => {
  if (e.target.id === 'station-manager-button') {
    return showStation();
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

const showStation = () => {
  loadStation();
  $stationContainer.style.display = 'block';
};

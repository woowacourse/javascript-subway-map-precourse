import { SubwayMapView } from './views';
import { SubwayMapViewModel } from './viewModels';
import { SubwayMapModel } from './models';

window.addEventListener('DOMContentLoaded', () => {
  const managerContainer = document.getElementById('manager-container');
  const stationManagerButton = document.getElementById(
    '#station-manager-button',
  );
  const lineManagerButton = document.getElementById('#line-manager-button');

  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapView = new SubwayMapView(
    subwayMapViewModel,
    managerContainer,
    stationManagerButton,
    lineManagerButton,
  );
});

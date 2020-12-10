import { SubwayMapView } from './views';
import { SubwayMapViewModel } from './viewModels';
import { SubwayMapModel } from './models';

window.addEventListener('DOMContentLoaded', () => {
  const stationManagerButton = document.getElementById(
    '#station-manager-button',
  );

  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapView = new SubwayMapView(
    subwayMapViewModel,
    stationManagerButton,
  );
});

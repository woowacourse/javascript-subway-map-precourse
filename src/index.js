import {
  SubwayMapLineView,
  SubwayMapStationView,
  SubwayMapSectionView,
  SubwayMapMapPrintView,
} from './views';
import { SubwayMapViewModel } from './viewModels';
import { SubwayMapModel } from './models';

window.addEventListener('DOMContentLoaded', () => {
  const managerContainer = document.getElementById('manager-container');
  const stationManagerButton = document.getElementById(
    '#station-manager-button',
  );
  const lineManagerButton = document.getElementById('#line-manager-button');
  const sectionManagerButton = document.getElementById(
    '#section-manager-button',
  );
  const mapPrintManagerButton = document.getElementById(
    '#map-print-manager-button',
  );

  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapStationView = new SubwayMapStationView(
    subwayMapViewModel,
    managerContainer,
    stationManagerButton,
  );
  const subwayMapLineView = new SubwayMapLineView(
    subwayMapViewModel,
    managerContainer,
    lineManagerButton,
  );
  const subwayMapSectionView = new SubwayMapSectionView(
    subwayMapViewModel,
    managerContainer,
    sectionManagerButton,
  );
  const subwayMapMapPrintView = new SubwayMapMapPrintView(
    subwayMapViewModel,
    managerContainer,
    mapPrintManagerButton,
  );
});

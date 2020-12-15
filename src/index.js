import {
  SubwayMapLineView,
  SubwayMapStationView,
  SubwayMapSectionView,
  SubwayMapMapPrintView,
} from './views';
import { SubwayMapViewModel } from './viewModels';
import { SubwayMapModel } from './models';

window.addEventListener('DOMContentLoaded', () => {
  const managerContainer = document.querySelector('#manager-container');
  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapStationView = new SubwayMapStationView(
    subwayMapViewModel,
    managerContainer,
    document.querySelector('#station-manager-button'),
  );
  const subwayMapLineView = new SubwayMapLineView(
    subwayMapViewModel,
    managerContainer,
    document.querySelector('#line-manager-button'),
  );
  const subwayMapSectionView = new SubwayMapSectionView(
    subwayMapViewModel,
    managerContainer,
    document.querySelector('#section-manager-button'),
  );
  const subwayMapMapPrintView = new SubwayMapMapPrintView(
    subwayMapViewModel,
    managerContainer,
    document.querySelector('#map-print-manager-button'),
  );
});

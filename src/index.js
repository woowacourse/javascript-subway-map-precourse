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
  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapStationView = new SubwayMapStationView(
    subwayMapViewModel,
    managerContainer,
    document.getElementById('#station-manager-button'),
  );
  const subwayMapLineView = new SubwayMapLineView(
    subwayMapViewModel,
    managerContainer,
    document.getElementById('#line-manager-button'),
  );
  const subwayMapSectionView = new SubwayMapSectionView(
    subwayMapViewModel,
    managerContainer,
    document.getElementById('#section-manager-button'),
  );
  const subwayMapMapPrintView = new SubwayMapMapPrintView(
    subwayMapViewModel,
    managerContainer,
    document.getElementById('#map-print-manager-button'),
  );
});

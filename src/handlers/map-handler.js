import {STORAGE} from '../constants.js';
import {renderSubwayMap} from '../views/subway-map-view.js';
import {getList} from '../main/subway-local-storage.js';

class MapHandler {
  handleMap() {
    renderSubwayMap(getList(STORAGE.LINE.KEY) || {});
  }
}

const mapHandler = new MapHandler();

export const {handleMap} = mapHandler;

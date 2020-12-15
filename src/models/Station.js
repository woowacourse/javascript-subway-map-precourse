import { saveData, loadData } from '../utils/storage.js';

const KEY = 'stations';

export default {
  stations: new Set(loadData(KEY)),

  getStations() {
    return [...this.stations];
  },

  add(station) {
    if (this.stations.has(station)) {
      throw new Error('중복된 역명입니다.');
    }

    this.stations.add(station);
    this.save();
  },

  save() {
    saveData(KEY, Array.from(this.stations));
  },

  delete(station) {
    this.stations.delete(station);
    this.save();
  },
};

import { saveData, loadData } from "../utils/storage.js";

const STORAGE_KEY = "station";
export default {
  data: loadData(STORAGE_KEY),
  list() {
    return this.data;
  },
  add(name) {
    this.data.push(name);
    saveData(STORAGE_KEY, this.data);
  },
  delete(name) {
    const stationIndex = this.data.indexOf(name);
    this.data.splice(stationIndex, 1);
    saveData(STORAGE_KEY, this.data);
  },
};

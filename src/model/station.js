import { Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";

export const Station = {
  key: Constant.STORAGE_KEY_STATION,
  stations: [],

  add(name) {
    this.stations.push(name);
    Storage.save(this.key, this.stations);
  },
};

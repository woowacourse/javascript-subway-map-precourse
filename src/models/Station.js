import { save, load } from "../utils/storage.js";

const STORAGE_KEY = 'stations';

export default {
  data: new Set(load(STORAGE_KEY)),

  list() {
    return [...this.data];
  },

  add(name) {
    if(this.data.has(name)) {
      throw new Error('중복된 역명입니다.');
    }

    this.data.add(name);
    this.save();
  },

  remove(name) {
    if(!this.data.has(name)) {
      throw new Error('존재하지 않는 역명입니다.');
    }

    this.data.delete(name);
    this.save();
  },

  save() {
    const data = Array.from(this.data);
    save(STORAGE_KEY, data);
  }
}

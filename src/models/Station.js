export default {
  data: new Set(),

  list() {
    return [...this.data];
  },

  add(name) {
    if(this.data.has(name)) {
      throw new Error('중복된 역명입니다.');
    }

    this.data.add(name);
  },

  remove(name) {
    if(!this.data.has(name)) {
      throw new Error('존재하지 않는 역명입니다.');
    }

    this.data.delete(name);
  }
}

class SubwayLocalStorage {
  getList(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }
}

const subwayLocalStorage = new SubwayLocalStorage;

export const {getList, saveList} = subwayLocalStorage;

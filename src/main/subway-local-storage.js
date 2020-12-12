class SubwayLocalStorage {
  getList(key) {
    const list = JSON.parse(localStorage.getItem(key));

    if (list) return list;

    return [];
  }

  saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }
}

const subwayLocalStorage = new SubwayLocalStorage;

export const {getList, saveList} = subwayLocalStorage;

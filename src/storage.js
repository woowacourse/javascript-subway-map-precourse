class Storage {
  saveItems = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  loadItems = key => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data === null) {
      return [];
    }

    return data;
  };
}

export default new Storage();

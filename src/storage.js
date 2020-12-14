class Storage {
  saveItems = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  loadItems = key => {
    let data = localStorage.getItem(key);
    console.log(data);
    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  };
}

export default new Storage();
